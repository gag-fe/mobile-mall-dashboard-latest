import {SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS} from '../actions'
export default function singleStoreReportDetail(state = {historyData:{rows:[]},isLoading:false}, action) {
  switch (action.type) {
    case SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS.REQUEST:
      return Object.assign({}, state,{isLoading:true})
    case SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS.SUCCESS:
      return Object.assign({}, state,{historyData:action.historyData},{isLoading:false})
    case SINGLE_STORE_REPORT_DETAIL_CLAIM_DETAILS.FAILURE:
      return Object.assign({}, state,{isLoading:false})
    default:
      return state
  }
}
