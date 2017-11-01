import login from './login'
import mallManage from './mallManage'
import storeReportDetail from './storeReportDetail'
import singleStoreReportDetail from './singleStoreReportDetail'
import salesAnalysis from './salesAnalysis'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  login,
  mallManage,
  salesAnalysis,
  storeReportDetail,
  singleStoreReportDetail,
});

export default rootReducer
