import moment from 'moment';
export const getToday=function(){
 return moment().add(0,'days').format('YYYY-MM-DD');
}
export const getToken = (state,name ) => state.login[name];
export const getFirstShopId = (state,name ) => {
    return state.mallManage.shopId;
}
export const getDateRangeInfo = (state,name ) => {
    return state.mallManage.dateRange[name];
}
export const getSalesAnalysisDateRangeInfo = (state,name ) => {
    return state.salesAnalysis.dateRange[name];
}
export const getReportDetailInfo = (state,name ) => {
    return state.storeReportDetail[name];
}
export const getReportDetailUnReportInfo = (state,name ) => {
    if(!state.storeReportDetail.unReport[name]){
      return 0;
    }
    return state.storeReportDetail.unReport[name];
}
export const getReportDetailCompleteReportInfo = (state,name ) => {
    if(!state.storeReportDetail.completeReport[name]){
      return 0;
    }
    return state.storeReportDetail.completeReport[name];
}
export const getSalesAnalysisShopListInfo= (state,name ) => {
    if(!state.salesAnalysis.shopList[name]){
      return 0;
    }
    return state.salesAnalysis.shopList[name];
}

//export const getStarredByUser = (state, login) => state.pagination.starredByUser[login] || {}
//export const getStargazersByRepo = (state, fullName) => state.pagination.stargazersByRepo[fullName] || {}
