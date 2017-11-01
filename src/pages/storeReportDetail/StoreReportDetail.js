import './StoreReportDetail.less';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Tabs from '@gag/tabs';
import UnReport from './UnReport.js';
import CompleteReport from './CompleteReport.js';
import DatePicker from '@gag/date-picker';
import {
  storeReportDetailCompleteReport,
  storeReportDetailUnReport,
  setDocumentTitle,
  storeReportReset
} from '../../actions';
const getToday=function(){
 return moment().add(0,'days');
}
const TabPane = Tabs.TabPane;
const CustomChildren = props =>{
  return (
    <div onClick={props.onClick} className="report-picker-show-value">
      {props.children}
      <span>{'< '}</span>
      <span>{props.extra}</span>
      <span>{' >'}</span>
    </div>
  )
}
class StoreReportDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dateValue:moment(props.initDateValue),
        activeKey:props.activeKey,
      };
    }
    onRouteSingleStorereportDetail=(singleStoreClaimData)=>{
      let t=this;
      const {router,location} = t.props;
      router.push({pathname:'/singleStoreReportDetail',query:location.query,state:{singleStoreClaimData:singleStoreClaimData}});
    }
    handleTabClick=(key)=>{
      let t=this;
      if(key==1){
        t.props.onCompleteReport({activeKey:key});
      }else{
        t.props.onUnReport({activeKey:key});
      }
      this.setState({
        activeKey:key,
      });
    }
    componentDidMount() {
    }
    componentWillMount() {
      let t=this;
      setDocumentTitle('店铺上报明细');
      debugger
      if(t.props.activeKey==1){
        t.props.onCompleteReport({});
      }else{
        t.props.onUnReport({});
      }
    }
    dateChange=(value)=>{
        let t=this;
        let dateRange=value.format('YYYY-MM-DD');
        debugger
        if(t.props.activeKey==1){
          let completeReportCallback=function(){
              t.refs.completeReport._reactInternalInstance._renderedComponent._instance.clearDataSource();
          }
          t.props.onCompleteReport({fromDay:dateRange,toDay:dateRange},completeReportCallback);
        }else{
          let unReportCallback=function(){
            t.refs.unReport._reactInternalInstance._renderedComponent._instance.clearDataSource();
          }
          t.props.onUnReport({fromDay:dateRange,toDay:dateRange},unReportCallback);
        }
        this.setState({'dateValue':value});
    }
    render() {
      let t=this;
      return (
        <div id="store-report-detail">
          <Tabs
            defaultActiveKey="1"
            activeKey={this.state.activeKey}
            onTabClick={this.handleTabClick}
            destroyInactiveTabPane={true}
            swipeable={false }
            hammerOptions={{
              recognizers:{
                pan:{ threshold: 300 }
              }
            }}
            >
            <TabPane tab={`已上报商家${t.props.activeKey==1?'('+t.props.completeReportTotal+')':''}`} key="1">
                <CompleteReport ref="completeReport" completeReportCallback={t.onRouteSingleStorereportDetail} ></CompleteReport>
            </TabPane>
            <TabPane tab={`未上报商家${t.props.activeKey!=1?'('+t.props.unReportTotal+')':''}`} key="2">
                <UnReport ref="unReport" unReportCallback={t.onRouteSingleStorereportDetail}></UnReport>
            </TabPane>
          </Tabs>
          <DatePicker
            mode="date"
            title="选择日期"
            onChange={this.dateChange}
            value={this.state.dateValue}
            maxDate={getToday()}
          >
          <CustomChildren></CustomChildren>
          </DatePicker>
        </div>
      );
    }
    componentWillUnmount() {
        let t=this;
        debugger
        t.props.storeReportReset()
    }
  }
  function mapStateToProps(state) {
    return {
      initDateValue:state.storeReportDetail.fromDay,
      activeKey:state.storeReportDetail.activeKey,
      unReportTotal:state.storeReportDetail.unReport.total||0,
      completeReportTotal:state.storeReportDetail.completeReport.total||0,
    }
  }

  export default connect(mapStateToProps, {
    onCompleteReport:storeReportDetailCompleteReport.request,
    onUnReport:storeReportDetailUnReport.request,
    storeReportReset:storeReportReset,
  })(StoreReportDetail)
