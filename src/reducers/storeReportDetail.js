import {
  STORE_REPORT_DETAIL_COMPLETE_REPORT,
  STORE_REPORT_DETAIL_UN_REPORT,STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT,
  STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT,
  STORE_REPORT_RESET
} from '../actions';
import {getToday} from '../reducers/selectors';
const coverReport=function(state,action,flag){
  let isLoading=flag+'Loading';
  let hasMore=flag+'More';
  if(action[flag].rows.length===action[flag].total){
    return Object.assign({}, state,{[flag]:action[flag]},{[isLoading]:false,[hasMore]:false})
  }
  return Object.assign({}, state,{[flag]:action[flag]},{[isLoading]:false,[hasMore]:true})
}
const mergeReport=function(state,action,flag){
  action[flag].rows=[].concat(state[flag].rows,action[flag].rows);
  let result=coverReport(state,action,flag)
  return result;
}

const initStoreReportDetail={
  fromDay:getToday(),
  toDay:getToday(),
  activeKey:'1',
  completeReport:{rows:[]},
  unReport:{rows:[]},
  completeReportLoading:false,
  completeReportMore:true,
  unReportLoading:false,
  unReportMore:true,
}
const resetStoreReportDetail={
  fromDay:getToday(),
  toDay:getToday(),
  activeKey:'1',
  completeReport:{rows:[]},
  unReport:{rows:[]},
  completeReportLoading:false,
  completeReportMore:true,
  unReportLoading:false,
  unReportMore:true,
}
export default function storeReportDetail(state = initStoreReportDetail, action) {
  switch (action.type) {
    case STORE_REPORT_DETAIL_COMPLETE_REPORT.REQUEST:
        return Object.assign({}, state,action.data,{completeReportLoading:true})
    case STORE_REPORT_DETAIL_COMPLETE_REPORT.SUCCESS:
        return coverReport(state,action,'completeReport')
    case STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT.REQUEST:
      return Object.assign({}, state,{completeReportLoading:true})
    case STORE_REPORT_DETAIL_NEXT_PAGE_COMPLETE_REPORT.SUCCESS:
        return mergeReport(state,action,'completeReport')
    case STORE_REPORT_DETAIL_UN_REPORT.REQUEST:
        return Object.assign({}, state,action.data,{unReportLoading:true})
    case STORE_REPORT_DETAIL_UN_REPORT.SUCCESS:
        return coverReport(state,action,'unReport')
    case STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT.SUCCESS:
        return mergeReport(state,action,'unReport')
    case STORE_REPORT_RESET:
        return Object.assign({}, state,resetStoreReportDetail)
    case STORE_REPORT_DETAIL_NEXT_PAGE_UN_REPORT.REQUEST:
        return Object.assign({}, state,{unReportLoading:true})
    case STORE_REPORT_DETAIL_COMPLETE_REPORT.FAILURE:
        return Object.assign({}, state,{unReportLoading:false,completeReportLoading:false})
    default:
      return state
  }
}
