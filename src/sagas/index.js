/* eslint-disable no-constant-condition */
import { take, put, call, fork, select, all } from 'redux-saga/effects'
import api from '../services/api'
import Toast from '@gag/toast';
import * as actions from '../actions';
import {
  getToken,
  getFirstShopId,
  getToday,
  getDateRangeInfo,
  getTimeRange,
  getReportDetailInfo,
  getReportDetailUnReportInfo,
  getReportDetailCompleteReportInfo,
  getSalesAnalysisDateRangeInfo,
  getSalesAnalysisShopListInfo,
} from '../reducers/selectors'

// each entity defines 3 creators { request, success, failure }
const {
  login,
  mallManageShops,
  mallManageDailyReport,
  mallManageSaleTrend,
  mallManageSumDim,
  mallManageShopList,
  salesAnalysisShopList,
  salesAnalysisNextPageShopList,
  storeReportDetailCompleteReport,
  storeReportDetailUnReport,
  storeReportDetailNextPageCompleteReport,
  storeReportDetailNextPageUnReport,
  singleStoreReportDetailClaimDetails,
  salesAnalysisInit
} = actions
import {flatIntoComplex} from '../global/util';
// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
const firstPageStarredUrl = login => `users/${login}/starred`
const firstPageStargazersUrl = fullName => `repos/${fullName}/stargazers`
const networkError=function(error){
  if(error.status==0){
    error.message='网络异常,请检查网络';
  }
}

/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
// function* fetchEntity(entity, apiFn, id, url) {
//   yield put( entity.request(id) )
//   const {response, error} = yield call(apiFn, url || id)
//   if(response)
//     yield put( entity.success(id, response) )
//   else
//     yield put( entity.failure(id, error) )
// }
//
// // yeah! we can also bind Generators
// export const fetchUser       = fetchEntity.bind(null, user, api.fetchUser)
// export const fetchRepo       = fetchEntity.bind(null, repo, api.fetchRepo)
// export const fetchStarred    = fetchEntity.bind(null, starred, api.fetchStarred)
// export const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers)

// load user unless it is cached
function* loadCheckLogin(postData,callback,resetVerifyRandom) {
  try{
    const response=yield call(api.login.checkLogin,postData);
    if(!postData.rememberPassword){
      postData.account='';
      postData.password='';
    }
    let data=Object.assign({},response,postData);
    yield put( login.success(data) );
    callback();
  }catch(error){
    networkError(error);
    resetVerifyRandom();
    Toast.info(error.message,3,null,false);
  }
}
function* loadMallManageSaleTrendAndSumDim(){
  const token = yield select(getToken,'token');
  let shopId=yield select(getFirstShopId);
  let fromDay=yield select(getDateRangeInfo,'fromDay');
  let toDay=yield select(getDateRangeInfo,'toDay');
  let timeRange=yield select(getDateRangeInfo,'timeRange');
  if((fromDay===toDay)&&(timeRange=='range')){
    timeRange='day';
  }
  let basePostDate={
        fromDay:fromDay,
        toDay:toDay,
        sso_token:token,
        token:token,
        shopId:shopId,
        timeRange:timeRange,
  }
  let saleTrendPostData=basePostDate;
  let sumDimPostData=Object.assign({
        sortBy:'dimName',
        reverse:0,
        dimType:'categoryRoot,shopFloor',
      },basePostDate);
  let shopListPostData=Object.assign({
        pageSize:5,
        pageIndex:1,
        sortBy:'amount',
        reverse:1,
      },basePostDate);
  yield fork(loadMallManageSaleTrend,saleTrendPostData);
  yield fork(loadMallManageSumDim,sumDimPostData);
  yield fork(loadMallManageShopList,shopListPostData);
}
function* loadMallManageShops() {
   try{
    const token = yield select(getToken,'token');
    //const shopEntityId=yield select(getShopEntityId,'shopEntityId');
    let postData={
        sso_token:token,
        token:token,
        shopId:-1,
      }
    let data=yield call(api.mallManage.shops, postData);
    let orgList=new flatIntoComplex(data);
    let orgLists=orgList.findRootNode([]);
    orgList.haveChild(orgLists);
    let initShopId=yield select(getFirstShopId);
    if(!initShopId){
      for (let i = 0; i < orgLists.length; i++) {
        if(initShopId){
          break;
        }
        if(orgLists[i].isEmpty==0){
          initShopId=orgLists[i].id;
          break;
        }
        let item=orgLists[i];
        for (let j = 0; j < item.children.length; j++) {
          if(item.children[j].isEmpty==0){
            initShopId=item.children[j].id;
            break;
          }
        }
      }
    }
    yield put(mallManageShops.success(orgLists,initShopId));
    let shopId=yield select(getFirstShopId);
    let dailyReportPostDate={
          sso_token:token,
          shopId:shopId,
          fromDay:getToday(),
          toDay:getToday(),
        }
    yield fork(loadMallManageDailyReport,dailyReportPostDate);
    yield fork(loadMallManageSaleTrendAndSumDim);
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}
function* loadMallManageDailyReport(postData) {
  try{
    const dailyReportData=yield call(api.mallManage.dailyReport,postData);
    yield put(mallManageDailyReport.success(dailyReportData));
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}
function* loadMallManageSaleTrend(postData) {
  //const repo = yield select(getRepo, fullName)
  //if (!repo || requiredFields.some(key => !repo.hasOwnProperty(key)))
  try{
    const saleTrend=yield call(api.mallManage.saleTrend,postData);
    yield put( mallManageSaleTrend.success(saleTrend) )
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}

function* loadMallManageSumDim(postData) {
  try{
    const sumDimdata=yield call(api.mallManage.sumDim,postData);
    yield put(mallManageSumDim.success(sumDimdata));
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}
function* loadMallManageShopList(postData) {
  try{
    const data=yield call(api.salesAnalysis.shopList,postData);
    yield put(mallManageShopList(data) )
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}
function* loadSalesAnalysisShopList(postData,callback){
  try{
    console.log('api.salesAnalysis.shopList',api.salesAnalysis.shopList);
    const data=yield call(api.salesAnalysis.shopList,postData);
    debugger
    if(callback){
      callback();
    }
    yield put(salesAnalysisShopList.success(data) )
  }catch(error){
    networkError(error);
    yield put( salesAnalysisShopList.failure())
    Toast.info(error.message,3,null,false);
  }
}
function* loadSalesAnalysisInit(postData){
  try{
    const data=yield call(api.salesAnalysis.init,postData);
    let sumDim={
      categoryType:data.categoryType,
      floor:data.floor
    };

    yield put(salesAnalysisInit.success(sumDim) )
  }catch(error){
    networkError(error);
    Toast.info(error.message,3,null,false);
  }
}
function* loadSalesAnalysisNextPageShopList(postData) {
  try{
    const data=yield call(api.salesAnalysis.shopList,postData);
    yield put(salesAnalysisNextPageShopList.success(data) )
  }catch(error){
    networkError(error);
    yield put( salesAnalysisShopList.failure())
    Toast.info(error.message,3,null,false);
  }
}
function* loadStoreReportDetailCompleteReport(postData,callback) {
  try{
    const data=yield call(api.storeReportDetail.claimDetails,postData);
    if(callback){
      callback();
    }
    yield put(storeReportDetailCompleteReport.success(data) )
  }catch(error){
    networkError(error);
    yield put( storeReportDetailCompleteReport.failure())
    Toast.info(error.message,3,null,false);
  }
}
function* loadStoreReportDetailNextPageCompleteReport(postData) {
  try{
    const data=yield call(api.storeReportDetail.claimDetails,postData);
    yield put(storeReportDetailNextPageCompleteReport.success(data) )
  }catch(error){
    networkError(error);
    yield put( storeReportDetailCompleteReport.failure())
    Toast.info(error.message,3,null,false);
  }
}

function* loadStoreReportDetailUnReport(postData,callback) {
  try{
    const data=yield call(api.storeReportDetail.claimDetails,postData);
    if(callback){
      callback();
    }
    yield put(storeReportDetailUnReport.success(data) )
  }catch(error){
    networkError(error);
    yield put( storeReportDetailCompleteReport.failure())
    Toast.info(error.message,3,null,false);
  }
}
function* loadStoreReportDetailNextPageUnReport(postData) {
  try{
    const data=yield call(api.storeReportDetail.claimDetails,postData);
    yield put(storeReportDetailNextPageUnReport.success(data) )
  }catch(error){
    networkError(error);
    yield put( storeReportDetailCompleteReport.failure())
    Toast.info(error.message,3,null,false);
  }
}
function* loadSingleStoreReportDetailClaimDetails(postData) {
  try{
    const data=yield call(api.storeReportDetail.claimDetails,postData);
    yield put(singleStoreReportDetailClaimDetails.success(data) )
  }catch(error){
    networkError(error);
    yield put( singleStoreReportDetailClaimDetails.failure())
    Toast.info(error.message,3,null,false);
  }
}
/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// trigger router navigation via history
function* watchLogin() {
  while(true) {
    const {postData,callback,resetVerifyRandom} = yield take(actions.LOGIN.REQUEST)
    yield fork(loadCheckLogin,postData,callback,resetVerifyRandom)
  }
}

function* watchMallManageShops() {
  while(true) {
    yield take(actions.MALL_MANAGE_SHOPS.REQUEST)
    yield fork(loadMallManageShops);
  }
}
function* watchSalesAnalysisShopList() {
  while(true) {
    let {postData,callback}=yield take(actions.SALES_ANALYSIS_SHOP_LIST.REQUEST);
    const token = yield select(getToken,'token');
    const shopId=yield select(getFirstShopId);
    const fromDay=yield select(getSalesAnalysisDateRangeInfo,'fromDay');
    const toDay=yield select(getSalesAnalysisDateRangeInfo,'toDay');
    const timeRange=yield select(getSalesAnalysisDateRangeInfo,'timeRange');
    let basePostDate={
          fromDay:fromDay,
          toDay:toDay,
          sso_token:token,
          token:token,
          shopId:shopId,
          timeRange:timeRange,
          pageIndex:1,
          pageSize:30,
          sortBy:'amount',
          reverse:1,
    }
    console.log(basePostDate);
    if(postData){
      basePostDate=Object.assign(basePostDate,postData)
    }
    yield fork(loadSalesAnalysisShopList,basePostDate,callback);
  }
}
function* watchSalesAnalysisInit() {
  while(true) {
    yield take(actions.SALES_ANALYSIS_INIT.REQUEST);
    const token = yield select(getToken,'token');
    const shopId=yield select(getFirstShopId);
    let basePostDate={
          sso_token:token,
          token:token,
          shopId:shopId,
    }
    yield fork(loadSalesAnalysisInit,basePostDate);
  }
}


//
// // Fetches data for a Repo: repo data + repo stargazers
function* watchSalesAnalysisNextPageShopList() {
  while(true) {
    let {postData}=yield take(actions.SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST.REQUEST);
    const token = yield select(getToken,'token');
    const shopId=yield select(getFirstShopId);
    const fromDay=yield select(getSalesAnalysisDateRangeInfo,'fromDay');
    const toDay=yield select(getSalesAnalysisDateRangeInfo,'toDay');
    const timeRange=yield select(getSalesAnalysisDateRangeInfo,'timeRange');
    let pageIndex=yield select(getSalesAnalysisShopListInfo,'pageIndex');
        pageIndex++;
    console.log({},pageIndex)
    let basePostDate={
          fromDay:fromDay,
          toDay:toDay,
          sso_token:token,
          token:token,
          shopId:shopId,
          timeRange:timeRange,
          pageIndex:pageIndex,
          pageSize:30,
          sortBy:'amount',
          reverse:1,
    }
    if(postData){
      basePostDate=Object.assign(basePostDate,postData)
    }
    yield fork(loadSalesAnalysisNextPageShopList,basePostDate);
  }
}
//
// Fetches more starred repos, use pagination data from getStarredByUser(login)
function* watchMallManageOrgList() {
  while(true) {
    const {shopId} = yield take(actions.MALL_MANAGE_ORGLIST.REQUEST);
    const token = yield select(getToken,'token');
    yield fork(loadMallManageDailyReport,{fromDay:getToday(),toDay:getToday(),sso_token:token,shopId:shopId});
    yield fork(loadMallManageSaleTrendAndSumDim);
  }
}
function* watchMallManageDateRange() {
  while(true) {
    yield take(actions.MALL_MANAGE_DATE_RANGE);
    yield fork(loadMallManageSaleTrendAndSumDim);
  }
}

//

function* watchStoreReportDetailCompleteReport() {
  while(true) {
    let {callback}=yield take(actions.STORE_REPORT_DETAIL_COMPLETE_REPORT.REQUEST);
    const token = yield select(getToken,'token');
    let shopId=yield select(getFirstShopId);
    let dayRange=yield select(getReportDetailInfo,'fromDay');
    let postData={
      isClaimed:1,
      shopId:shopId,
      fromDay:dayRange,
      toDay:dayRange,
      reverse:0,
      pageIndex:1,
      pageSize:30,
      sortBy:'shopEntityName',
      sso_token:token,
    }
    yield fork(loadStoreReportDetailCompleteReport,postData,callback);
  }
}
function* watchStoreReportDetailNextPageCompleteReport() {
  while(true) {
    yield take(actions.STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT.REQUEST);
    const token = yield select(getToken,'token');
    const shopId=yield select(getFirstShopId);
    const dayRange=yield select(getReportDetailInfo,'fromDay');
    let pageIndex=yield select(getReportDetailCompleteReportInfo,'pageIndex');
    pageIndex++;
    let postData={
      isClaimed:1,
      shopId:shopId,
      fromDay:dayRange,
      toDay:dayRange,
      reverse:0,
      pageIndex:pageIndex,
      pageSize:30,
      sortBy:'shopEntityName',
      sso_token:token,
    }
    yield fork(loadStoreReportDetailNextPageCompleteReport,postData);
  }
}
function* watchStoreReportDetailNextPageUnReport() {
  while(true) {
    yield take(actions.STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT.REQUEST);
    const token = yield select(getToken,'token');
    let shopId=yield select(getFirstShopId);
    let dayRange=yield select(getReportDetailInfo,'fromDay');
    let pageIndex=yield select(getReportDetailUnReportInfo,'pageIndex');
    pageIndex++;
    let postData={
      isClaimed:0,
      shopId:shopId,
      fromDay:dayRange,
      toDay:dayRange,
      reverse:0,
      pageIndex:pageIndex,
      pageSize:30,
      sortBy:'shopEntityName',
      sso_token:token,
    }
    yield fork(loadStoreReportDetailNextPageUnReport,postData);
  }
}
function* watchStoreReportDetailUnReport() {
  while(true) {
    let {callback} =yield take(actions.STORE_REPORT_DETAIL_UN_REPORT.REQUEST);
    const token = yield select(getToken,'token');
    let shopId=yield select(getFirstShopId);
    let dayRange=yield select(getReportDetailInfo,'fromDay');
    let postData={
      isClaimed:0,
      shopId:shopId,
      fromDay:dayRange,
      toDay:dayRange,
      reverse:0,
      pageIndex:1,
      pageSize:30,
      sortBy:'shopEntityName',
      sso_token:token,
    }
    yield fork(loadStoreReportDetailUnReport,postData,callback);
  }
}
function* watchSingleStoreReportDetailClaimDetails() {
  while(true) {
    const {postData}=yield take(actions.SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS.REQUEST);
    const token = yield select(getToken,'token');
    const shopId=yield select(getFirstShopId);
    let basePostDate={
          sso_token:token,
          token:token,
          shopId:shopId,
    }
    basePostDate=Object.assign(basePostDate,postData)
    yield fork(loadSingleStoreReportDetailClaimDetails,basePostDate)
  }
}

export default function* root() {
  yield [
    fork(watchLogin),
    fork(watchMallManageShops),
    fork(watchMallManageOrgList),
    fork(watchMallManageDateRange),
    fork(watchSalesAnalysisInit),
    fork(watchSalesAnalysisShopList),
    fork(watchSalesAnalysisNextPageShopList),
    fork(watchStoreReportDetailCompleteReport),
    fork(watchStoreReportDetailUnReport),
    fork(watchSingleStoreReportDetailClaimDetails),
    fork(watchStoreReportDetailNextPageCompleteReport),
    fork(watchStoreReportDetailNextPageUnReport)
  ]
}
