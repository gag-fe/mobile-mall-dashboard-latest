
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const LOGIN = createRequestTypes('LOGIN')
export const MALL_MANAGE_SHOPS = createRequestTypes('MALL_MANAGE_SHOPS')
export const MALL_MANAGE_DAILY_REPORT = createRequestTypes('MALL_MANAGE_DAILY_REPORT')
export const MALL_MANAGE_SALE_TREND = createRequestTypes('MALL_MANAGE_SALE_TREND')
export const MALL_MANAGE_SUM_DIM = createRequestTypes('MALL_MANAGE_SUM_DIM')
export const MALL_MANAGE_ORGLIST = createRequestTypes('MALL_MANAGE_ORGLIST')
export const SALES_ANALYSIS_SHOP_LIST= createRequestTypes('HISTORY_DETAIL')
export const SALES_ANALYSIS_INIT= createRequestTypes('SALES_ANALYSIS_INIT')
export const SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST= createRequestTypes('SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST')
export const STORE_REPORT_DETAIL_UN_REPORT= createRequestTypes('STORE_REPORT_DETAIL_UN_REPORT')
export const STORE_REPORT_DETAIL_COMPLETE_REPORT= createRequestTypes('STORE_REPORT_DETAIL_COMPLETE_REPORT')
export const STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT= createRequestTypes('STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT')
export const STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT= createRequestTypes('STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT')
export const SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS= createRequestTypes('SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS')

export const MALL_MANAGE_DATE_RANGE = 'MALL_MANAGE_DATE_RANGE';
export const MALL_MANAGE_RESET = 'MALL_MANAGE_RESET';
export const STORE_REPORT_RESET = 'STORE_REPORT_RESET';
export const MALL_MANAGE_SHOP_LIST = 'MALL_MANAGE_SHOP_LIST';
export const SET_STORE_DETAIL_VALUE = 'SET_STORE_DETAIL_VALUE'
export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE'
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED'
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


function action(type, payload = {}) {
  return {type, ...payload}
}

export const login = {
  request: (postData,callback,resetVerifyRandom) => action(LOGIN[REQUEST], {postData,callback,resetVerifyRandom}),
  success: (response) => action(LOGIN[SUCCESS], {response}),
  failure: (login, error) => action(LOGIN[FAILURE], {login, error}),
}
export const mallManageShops = {
  request: () => action(MALL_MANAGE_SHOPS[REQUEST]),
  success: (orgList,shopId) => action(MALL_MANAGE_SHOPS[SUCCESS], {orgList,shopId}),
  failure: () => action(MALL_MANAGE_SHOPS[FAILURE]),
}
export const mallManageDailyReport = {
  request: (state) => action(MALL_MANAGE_DAILY_REPORT[REQUEST],state),
  success: (dailyReport) => action(MALL_MANAGE_DAILY_REPORT[SUCCESS], {dailyReport}),
  failure: () => action(MALL_MANAGE_DAILY_REPORT[FAILURE]),
}

export const mallManageSaleTrend= {
  request: () => action(MALL_MANAGE_SALE_TREND[REQUEST]),
  success: (saleTrend) => action( MALL_MANAGE_SALE_TREND[SUCCESS], {saleTrend}),
  failure: () => action( MALL_MANAGE_SALE_TREND[FAILURE]),
}

export const mallManageSumDim = {
  request: (data) => action(MALL_MANAGE_SUM_DIM[REQUEST],data),
  success: (sumDim) => action(MALL_MANAGE_SUM_DIM[SUCCESS],{sumDim}),
  failure: () => action(MALL_MANAGE_SUM_DIM[FAILURE]),
}
export const mallManageOrgList = {
  request: (shopId) => action(MALL_MANAGE_ORGLIST[REQUEST],{shopId}),
  success: (response) => action(MALL_MANAGE_ORGLIST[SUCCESS], {response}),
  failure: () => action(MALL_MANAGE_ORGLIST[FAILURE]),
}
export const salesAnalysisShopList  = {
  request: (dateRange,postData,callback) => action(SALES_ANALYSIS_SHOP_LIST[REQUEST],{dateRange,postData,callback}),
  success: (shopList) => action(SALES_ANALYSIS_SHOP_LIST[SUCCESS], {shopList}),
  failure: () => action(SALES_ANALYSIS_SHOP_LIST[FAILURE]),
}
export const salesAnalysisInit  = {
  request: () => action(SALES_ANALYSIS_INIT[REQUEST]),
  success: (sumDim) => action(SALES_ANALYSIS_INIT[SUCCESS], {sumDim}),
  failure: () => action(SALES_ANALYSIS_SHOP_LIST[FAILURE]),
}
export const salesAnalysisNextPageShopList  = {
  request: (postData) => action(SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST[REQUEST],{postData}),
  success: (shopList) => action(SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST[SUCCESS], {shopList}),
  failure: () => action(SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST[FAILURE]),
}
export const storeReportDetailNextPageCompleteReport  = {
  request: (data) => action(STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT[REQUEST],{data}),
  success: (completeReport) => action(STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT[SUCCESS], {completeReport}),
  failure: () => action(STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT[FAILURE]),
}
export const storeReportDetailNextPageUnReport  = {
  request: (data) => action(STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT[REQUEST],{data}),
  success: (unReport) => action(STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT[SUCCESS], {unReport}),
  failure: () => action(STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT[FAILURE]),
}

export const storeReportDetailCompleteReport  = {
  request: (data,callback) => action(STORE_REPORT_DETAIL_COMPLETE_REPORT[REQUEST],{data,callback}),
  success: (completeReport) => action(STORE_REPORT_DETAIL_COMPLETE_REPORT[SUCCESS], {completeReport}),
  failure: () => action(STORE_REPORT_DETAIL_COMPLETE_REPORT[FAILURE]),
}
export const storeReportDetailUnReport= {
  request: (data,callback) => action(STORE_REPORT_DETAIL_UN_REPORT[REQUEST],{data,callback}),
  success: (unReport) => action(STORE_REPORT_DETAIL_UN_REPORT[SUCCESS], {unReport}),
  failure: () => action(STORE_REPORT_DETAIL_UN_REPORT[FAILURE]),
}
export const singleStoreReportDetailClaimDetails  = {
  request: (postData) => action(SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS[REQUEST],{postData}),
  success: (historyData) => action(SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS[SUCCESS], {historyData}),
  failure: () => action(SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS[FAILURE]),
}
export const mallManageDateRange = dateRange => action(MALL_MANAGE_DATE_RANGE,{dateRange})
export const mallManageReset = () => action(MALL_MANAGE_RESET)
export const mallManageShopList = shopList => action(MALL_MANAGE_SHOP_LIST,{shopList})
export const storeReportReset = () => action(STORE_REPORT_RESET)
export const setDocumentTitle=function(html){
  document.title=html;
}
//export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
//export const loadRepoPage = (fullName, requiredFields = []) => action(LOAD_REPO_PAGE, {fullName, requiredFields})
//export const loadMoreStarred = login => action(LOAD_MORE_STARRED, {login})
//export const loadMoreStargazers = fullName => action(LOAD_MORE_STARGAZERS, {fullName})
//
//export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
