import {SALES_ANALYSIS_SHOP_LIST,SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST,SALES_ANALYSIS_INIT} from '../actions'
import {getToday} from './selectors';
const coverReport=function(state,action){
  if(action.shopList.rows.length===action.shopList.total){
    return Object.assign({}, state,{shopList:action.shopList},{isLoading:false,hasMore:false})
  }
  return Object.assign({}, state,{shopList:action.shopList},{isLoading:false,hasMore:true})
}
const mergeShopList=function(state,action){
  action.shopList.rows=[].concat(state.shopList.rows,action.shopList.rows);
  let result=coverReport(state,action);
  return result;
}

const mergeDateRange=function(state,action){
  if(action.dateRange){
    return Object.assign({}, state,{dateRange:action.dateRange},{isLoading:true,hasMore:true})
  }
  return Object.assign({}, state,{isLoading:true,hasMore:true})
}

const initSalesAnalysisState={
  shopList:{rows:[]},
  isLoading:false,
  hasMore:true,
  dateRange:{selectedIndex:0,fromDay:getToday(),toDay:getToday(),timeRange:'day'},
  sumDim:{categoryType:[],floor:[]},
}
export default function salesAnalysis(state =initSalesAnalysisState, action) {
  switch (action.type) {
    case SALES_ANALYSIS_SHOP_LIST.REQUEST:
      return mergeDateRange(state,action)
    case SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST.REQUEST:
      return Object.assign({}, state,{isLoading:true})
    case SALES_ANALYSIS_SHOP_LIST.SUCCESS:
      return coverReport(state,action)
    case SALES_ANALYSIS_NEXT_PAGE_SHOP_LIST.SUCCESS:
      return mergeShopList(state,action);
    case SALES_ANALYSIS_INIT.SUCCESS:
      return Object.assign({}, state,{sumDim:action.sumDim})
    case SALES_ANALYSIS_SHOP_LIST.FAILURE:
        return Object.assign({}, state,{isLoading:false})
    default:
      return state
  }
}
