import moment from 'moment';
import {
  MALL_MANAGE_SHOPS,
  MALL_MANAGE_DAILY_REPORT,
  MALL_MANAGE_SALE_TREND,
  MALL_MANAGE_SUM_DIM,
  MALL_MANAGE_ORGLIST,
  MALL_MANAGE_DATE_RANGE,
  MALL_MANAGE_SHOP_LIST,
  MALL_MANAGE_RESET,
} from '../actions'
import {getToday} from './selectors';
let initMallManageState={
  orgList:[],
  dailyReport:{},
  dateRange:{selectedIndex:0,fromDay:getToday(),toDay:getToday(),timeRange:'day'},
  saleTrend:{rows:[]},
  sumDim:{categoryRoot:[],shopFloor:[]},
  shopList:{rows:[]},
  shopId:'',
  isLoading:true
}
const resetMallManageSate={
  orgList:[],
  dailyReport:{},
  dateRange:{selectedIndex:0,fromDay:getToday(),toDay:getToday(),timeRange:'day'},
  saleTrend:{rows:[]},
  sumDim:{categoryRoot:[],shopFloor:[]},
  shopList:{rows:[]},
  shopId:'',
  isLoading:true
}
let initState=window.localStorage.getItem('__INITIAL_MALL_MANAGE__');
let loginState=window.localStorage.getItem('__LOGIN_STATUS__') === 'true';
if(initState&&loginState){
    initMallManageState=JSON.parse(initState);
}
export default function mallManage(state =initMallManageState, action) {
  switch (action.type) {
    case MALL_MANAGE_SHOPS.REQUEST:
      return Object.assign({}, state,{isLoading:true})
    case MALL_MANAGE_ORGLIST.REQUEST:
      return Object.assign({}, state,{shopId:action.shopId})
    case MALL_MANAGE_SHOPS.SUCCESS:
      return Object.assign({}, state,{orgList:action.orgList,shopId:action.shopId},{isLoading:false})
    case MALL_MANAGE_DAILY_REPORT.SUCCESS:
      return Object.assign({}, state,{dailyReport:action.dailyReport})
    case MALL_MANAGE_SALE_TREND.SUCCESS:
      return Object.assign({}, state,{saleTrend:action.saleTrend})
    case MALL_MANAGE_SUM_DIM.SUCCESS:
      return Object.assign({}, state,{sumDim:action.sumDim})
    case MALL_MANAGE_DATE_RANGE:
      return Object.assign({}, state,{dateRange:action.dateRange})
    case MALL_MANAGE_SHOP_LIST:
      return Object.assign({}, state,{shopList:action.shopList})
    case MALL_MANAGE_RESET:
      return Object.assign({}, state,resetMallManageSate)
    case MALL_MANAGE_SHOPS.FAILURE:
      return Object.assign({}, state,{isLoading:false})
    default:
      return state
  }
}
