import './MallManage.less';
import React from 'react';
import {findDOMNode} from 'react-dom';
import moment from 'moment';
import List from '@gag/list';
import Icon from '@gag/icon';
import Flex from '@gag/flex';
import SelectTree from 'components/selectTree';
import DateRange from 'components/dateLayer';
import AreaChart from 'components/areaChart';
import RealTimeSales from './RealTimeSales';
import TabPieChart from './tabPieChart';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {mallManageShops,setStoreDetailValue,setDocumentTitle,mallManageOrgList,mallManageDateRange} from '../../actions';
import{toFixedNumber} from '../../global/util';
const areaChartName=[
  {unit:'时',now:'今天',next:'昨天',tickCount:24,formatter:function(value){return moment(value,'YYYYMMDDHHmmss').format('HH')}},
  {unit:'天',now:'本周',next:'上周',tickCount:7,formatter:function(value){
    moment.locale('zh-cn');
    return moment(value,'YYYYMMDDHHmmss').format('dddd')}},
  {unit:'天',now:'本月',next:'上月',tickCount:31,formatter:function(value){return moment(value,'YYYYMMDDHHmmss').format('MM/DD')}}
]
const timeRange=['day','week','month','range'];
const Subtitle =props => (
  <div className="subtitle-label">
    <p className="subtitle-required">{props.title}{props.children}</p>
  </div>
);

class MallManage extends React.Component{
  constructor(props) {
      super(props);
    }
  onDateRangeEndChange=(fromDay,toDay)=>{
     let postData={
       fromDay:fromDay.format('YYYY-MM-DD'),
       toDay:toDay.format('YYYY-MM-DD'),
       selectedIndex:null,
       timeRange:timeRange[3],
     }
    this.props.selectDateRange(postData);
  }
  onRouteStorereportDetail=()=>{
    this.props.router.push('/storeReportDetail');
  }
  onRouteSaleAnalysis=()=>{
    let t=this;
    const {
      router,
      location
    } = t.props;
    let state={dateRange:t.props.dateRange};
    router.push({pathname:'/salesAnalysis',query:location.query,state:state});
  }
  onLoginQuit=()=>{
    window.localStorage.setItem('__LOGIN_STATUS__',false);
    this.props.router.push('/login');
  }
  onSegmentedChange=(fromDay,toDay,selectedIndex)=>{

     let postData={
       fromDay:fromDay.format('YYYY-MM-DD'),
       toDay:toDay.format('YYYY-MM-DD'),
       selectedIndex:selectedIndex,
       timeRange:timeRange[selectedIndex],
     }
     this.props.selectDateRange(postData);
  }
  onSelectOrgList=(value)=>{

      this.props.selectOrgList(value);
  }
  topTenStoreList=()=>{
    // const data= Array.from(new Array(10)).map((_val, i) => ({
    //   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    //   text: `name${i}`,
    //   shopEntityName:'李同钱',
    //   amount:23,
    //   amountRate:0.23,
    //   billCount:43,
    //   billCountRate:0.43,
    // }));
    let t=this;
    let list=[];
    t.props.shopListTopTen.rows.forEach((rowData,index)=>{
      list.push(
        <div key={rowData.shopEntityId} className="row row-line">
          <div className="row-title">{rowData.shopEntityName}</div>
          <div className="row-content">
            <div className="row-text-left">
              <p className="row-text-title">销售额</p>
              <p className="row-text-value">{rowData.amount}</p>
              <p className="row-text-percent">{`销售额占比${toFixedNumber(rowData.amountRate,100)}%`}</p>
              <p className="row-text-percent">{`业态:${rowData.shopEntityTypeRoot||''}`}</p>
            </div>
            <div className="row-text-left">
              <p className="row-text-title">结账单</p>
              <p className="row-text-value">{rowData.billCount}</p>
              <p className="row-text-percent">{`结账单占比${toFixedNumber(rowData.billCountRate,100)}%`}</p>
              <p className="row-text-percent">{`楼层:${rowData.storey||''}`}</p>
            </div>
          </div>
        </div>
      )
      list.push(
        <div key={`${rowData.shopEntityId}-${rowData.amount}`} style={{
          backgroundColor: '#ECECED',
          height: 1
        }}
        />
      )
    })
    return list;
  }
  render() {
    let t=this;
    let {dailyReport,orgList,shopId,saleTrend,dateRange,shopListTopTen}=t.props;
    let initAreaChartName;
    let now='销售额';
    let next=null;
    let tickCount=12;
      if(dateRange.selectedIndex===null){
        let typeTime='天';
        let formatter=function(value){return moment(value,'YYYYMMDDHHmmss').format('MM/DD')}
      if(moment(dateRange.toDay).valueOf() - moment(dateRange.fromDay).valueOf() > 100*1000*60*60*24 ){
        typeTime = '月';
        formatter=function(value){
          return moment(value,'YYYYMMDDHHmmss').format('MM');
        }
      }else if(dateRange.toDay===dateRange.fromDay){
        typeTime='时';
        now=dateRange.toDay;
        next=moment(dateRange.toDay).add(-1,'days').format('YYYY-MM-DD');
        tickCount=24;
        formatter=function(value){return moment(value,'YYYYMMDDHHmmss').format('HH')}
      }
      initAreaChartName={unit:typeTime,now:now,next:next,tickCount:tickCount,formatter:formatter}
    }else{
      initAreaChartName=areaChartName[dateRange.selectedIndex];
    }
    let prefixCls=dailyReport.growthRate>0?'rise':'down';
    const realTimeSalesValue={
      rightContent:shopListTopTen.totalBillCount,
      rightTitle:"结账单",
      rightUnit:'单',
      leftContent:toFixedNumber(shopListTopTen.totalMoney),
      leftTitle:"销售额",
      leftUnit:'元',
    }
    const wrapCls = classNames({
      [`compare-yesterday-${prefixCls}`]: true,
      [`compare-yesterday`]: true,
      //[className]: className,
    });
    return (
      <div id="mall-manage">
        <div className="nav-bar">
          <div className="mall-title">
            <SelectTree onSelectOrgList={this.onSelectOrgList} orgList={orgList} shopId={shopId}></SelectTree>
          </div>
          <div className="login-quit" onClick={t.onLoginQuit}><Icon type={require('images/quit.svg')} size='md'/></div>
        </div>
        <div className="merchant-count" onClick={this.onRouteStorereportDetail}>
          <p>{`接入商户数:${dailyReport.shopEntityCount}(上报总金额${dailyReport.claimMoneyTotal}元)`}</p>
        </div>
        <Subtitle title="实时销售额 (元)"></Subtitle>
        <Flex>
          <div className="real-time-sale-total">
            {dailyReport.saleAmount}
          </div>
          <div className={wrapCls}>
            <p className="percent-rise">{toFixedNumber(dailyReport.growthRate,100)}%</p>
            <p className="compare-yesterday-tip">环比昨天</p>
          </div>
        </Flex>
        <RealTimeSales rightContent={toFixedNumber(dailyReport.avgPrice)} leftContent={dailyReport.billCount}></RealTimeSales>
        <DateRange ref='dateRange' {...dateRange} onEndChangeCallBack={this.onDateRangeEndChange} onSegmentedChangeCallBack={this.onSegmentedChange}></DateRange>
        <Subtitle title="销售额走势"></Subtitle>
        <AreaChart chartData={saleTrend.rows}  initAreaChartName={initAreaChartName}></AreaChart>
        <Subtitle title="销售额分布"></Subtitle>
        <TabPieChart></TabPieChart>
        <Subtitle title="店铺销售分析">
          <span className="subtitle-required-tips">(数据每10分钟更新一次)</span>
          <a onClick={this.onRouteSaleAnalysis}>查看更多</a>
        </Subtitle>
        <RealTimeSales {...realTimeSalesValue} ></RealTimeSales>
        <List>
          {
            t.topTenStoreList()
          }
        </List>
        {this.props.isLoading?
          <div style={{ padding: 30, textAlign: 'center',fontSize:'0.28rem' }}>加载中...</div>:<div style={{ padding: 30, textAlign: 'center',fontSize:'0.28rem' }}>
                加载完毕
         </div>
        }
    </div>);
  }
  componentWillMount() {
    let {mallManageShops}= this.props;
    // let postDataClaim={
    //   token:state.token,
    //   shopId:state.shopId,
    // }
    // let callback=function(data){
    //   let postData={
    //         token:state.token,
    //         shopId:state.shopId,
    //         fromDay:data[0].saleDate,
    //         toDay:data[data.length-1].saleDate,
    //       }
    //     Actions.getTenantsList(postData);
    // }
     mallManageShops();
  }

  componentDidMount() {
      let t=this;
      setDocumentTitle("Mall经营");
      let dateRange=findDOMNode(t.refs.dateRange);
      let winScroll=function(e){

          if(document.body.scrollTop <546 ){
              dateRange.classList.remove("date-range-fixed");
          };
          if(document.body.scrollTop >= 546){
              dateRange.classList.add("date-range-fixed");
          };
      }
      t.throttleScroll=winScroll
      document.addEventListener('scroll',t.throttleScroll,false);

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

      return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
      let t=this;
      document.removeEventListener('scroll',t.throttleScroll);
  }
}
function mapStateToProps(state) {
  window.localStorage.setItem('__INITIAL_MALL_MANAGE__',JSON.stringify(state.mallManage));
  return {
    orgList:state.mallManage.orgList,
    dailyReport:state.mallManage.dailyReport,
    shopId:state.mallManage.shopId,
    saleTrend:state.mallManage.saleTrend,
    dateRange:state.mallManage.dateRange,
    shopListTopTen:state.mallManage.shopList,
  }
}

export default connect(mapStateToProps, {
mallManageShops:mallManageShops.request,
selectOrgList:mallManageOrgList.request,
selectDateRange:mallManageDateRange,
entryStoreDetailValue:setStoreDetailValue,
})(MallManage)
