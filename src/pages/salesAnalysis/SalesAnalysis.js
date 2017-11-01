import './SalesAnalysis.less';
import React from 'react';
import ListView from '@gag/list-view';
import WhiteSpace from '@gag/white-space';
import InputItem from '@gag/input-item';
import Icon from '@gag/icon';
import Flex from '@gag/flex';
import moment from 'moment';
import DateRange from 'components/dateLayer';
import Select,{ Option }  from 'rc-select';
import 'rc-select/assets/index.css';
import { connect } from 'react-redux';
import{toFixedNumber} from '../../global/util';
import {salesAnalysisShopList,salesAnalysisNextPageShopList,setDocumentTitle,salesAnalysisInit} from '../../actions';
const pageSize =30;
const timeRange=['day','week','month','range'];
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}></span>
      {props.children}
    </div>
  );
}
class SalesAnalysis extends React.Component{
  constructor(props) {
    super(props);
      const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
      const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

      const dataSource = new ListView.DataSource({
        getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });

      this.dataBlob = {};
      this.sectionIDs = [];
      this.rowIDs = [];
      this.shopEntityName='';
      this.genData = (pIndex =0,data) => {
          if(data.length<=(this.rowIDs.length*pageSize)){
            return ;
          }
          const sectionName = `Section ${pIndex}`;
          this.sectionIDs.push(sectionName);
          this.dataBlob[sectionName] = sectionName;
          this.rowIDs[pIndex] = [];

          for (let j = 0; j <pageSize; j++) {
            const rowName = `S${pIndex}, R${j}`;
            let index=pIndex*pageSize+j;
            this.rowIDs[pIndex].push(rowName);
            this.dataBlob[rowName] =data[index];
          }
        // new object ref
        this.sectionIDs = [].concat(this.sectionIDs);
        this.rowIDs = [].concat(this.rowIDs);
      };
      const {state}=this.props.location;
      let selectFormat='all';
      let selectFloor='all';
      if(state&&state.format){
        selectFormat=state.format.dimName;
      }
      if(state&&state.floor){
        selectFloor=state.floor.dimName;
      }
      this.state={
         dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
         selectFormat:selectFormat,
         selectFloor:selectFloor,
         storeNameQuery:''
      };
    }
    onExtraClick=(e)=>{
      let t=this;
      let postData={
        shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
        floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
        shopEntityName:t.state.storeNameQuery.trim(),
      }
      this.shopEntityName=t.state.storeNameQuery;
      this.props.analysisShopList(null,postData,t.clearDataSource);
    }
    onStoreNameQuery=(value)=>{
      this.setState({
        storeNameQuery:value,
      });
    }
    onSelectFormat= (e) => {
      let t=this;
      let selectFormat;
      if (e && e.target) {
        selectFormat = e.target.value;
      } else {
        selectFormat = e;
      }
      this.setState({
        selectFormat:selectFormat,
      });
      let postData={
        shopEntityType:selectFormat=='all'?'':selectFormat,
        floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
        shopEntityName:t.shopEntityName,
      }
      this.props.analysisShopList(null,postData,t.clearDataSource);
    }
    onSelectFloor= (e) => {
      let t=this;
      let selectFloor;
      if (e && e.target) {
        selectFloor = e.target.value;
      } else {
        selectFloor = e;
      }
      this.setState({
        selectFloor:selectFloor,
      });
      let postData={
        shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
        floor:selectFloor=='all'?'':selectFloor,
        shopEntityName:t.shopEntityName,
      }
      this.props.analysisShopList(null,postData,t.clearDataSource);
    }
    onEndReached = (event) => {
      let t=this;
      console.log(1231,event);
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false

        if(!event){
          return;
        }
        if (t.props.isLoading || !t.props.hasMore) {
          return;
        }
        let postData={
          shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
          floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
          shopEntityName:t.shopEntityName.trim(),
        }
        t.props.nextPageShopList(postData);
      }
    getSelectList=(data)=>{
      if(data==null){
        data=[];
      }
      let list=data.map((item)=>{
      return (<Option value={item}>
               {item}
            </Option>)
    });
    return list;
  }
  onDateRangeEndChange=(fromDay,toDay)=>{
     let t=this;
     let dateRange={
       fromDay:fromDay.format('YYYY-MM-DD'),
       toDay:toDay.format('YYYY-MM-DD'),
       selectedIndex:null,
       timeRange:timeRange[3],
     }
     let postData={
       shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
       floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
       shopEntityName:t.shopEntityName,
     }
    this.props.analysisShopList(dateRange,postData,t.clearDataSource);
  }
  onSegmentedChange=(fromDay,toDay,selectedIndex)=>{
     let t=this;
     let dateRange={
       fromDay:fromDay.format('YYYY-MM-DD'),
       toDay:toDay.format('YYYY-MM-DD'),
       selectedIndex:selectedIndex,
       timeRange:timeRange[selectedIndex],
     }
     let postData={
       shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
       floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
       shopEntityName:t.shopEntityName,
     }

     this.props.analysisShopList(dateRange,postData,t.clearDataSource);
  }
  clearDataSource=()=>{
      this.dataBlob = {};
      this.sectionIDs = [];
      this.rowIDs = [];
    }
  render(){
      let t=this;
      let {categoryType,floor}=this.props.sumDim;

      let {dateRange}=this.props;
      const separator = (sectionID, rowID) => {
        if(!t.dataBlob[rowID]){
          return null;
        }
        return(
          <div key={`${sectionID}-${rowID}`} style={{
            backgroundColor: '#ECECED',
            height: 1
          }}
          />
        )
      };

      const row = (rowData, sectionID, rowID) => {
        if(!rowData){
          return null;
        }
        return (
          <div key={rowID} className="row">
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
        );
      };
      return(
        <div id="sales-analysis">
          <div id="fixed-title">
            <DateRange {...dateRange} onEndChangeCallBack={this.onDateRangeEndChange} onSegmentedChangeCallBack={this.onSegmentedChange}></DateRange>
            <WhiteSpace/>
            <Flex>
              <Flex.Item>
                <Select
                    value={this.state.selectFormat}
                    placeholder="请下拉选择"
                    className="select-style"
                    dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
                    optionLabelProp="children"
                    showSearch={false}
                    onChange={this.onSelectFormat}
                  >
                  <Option value={'all'}>
                      <span>{'全部业态'}</span>
                  </Option>
                  {
                    t.getSelectList(categoryType)
                  }
                </Select>
              </Flex.Item>
              <Flex.Item>
                <Select
                    value={this.state.selectFloor}
                    placeholder="请下拉选择"
                    className="select-style"
                    dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
                    optionLabelProp="children"
                    showSearch={false}
                    onChange={this.onSelectFloor}
                  >
                  <Option value={'all'}>
                      <span>{'全部楼层'}</span>
                  </Option>
                  {
                    t.getSelectList(floor)
                  }
                </Select>
              </Flex.Item>
                <InputItem
                  placeholder="输入店铺名称查询"
                  value={t.state.storeNameQuery}
                  onChange={this.onStoreNameQuery}
                  onExtraClick={this.onExtraClick}
                  extra={<Icon type={require('images/search.svg')} size='xs'/>}
                ></InputItem>
            </Flex>
          </div>
          <ListView ref="lv"
              dataSource={t.state.dataSource}
              renderFooter={() => {
                if(this.props.isLoading){
                  return(<div style={{ padding: 30, textAlign: 'center' }}>
                        加载中...
                 </div>)
                   }
                if(!this.props.hasMore&&(this.props.shopList.rows.length<=0)){
                  return(<div style={{ padding: 30, textAlign: 'center' }}>
                        没有找到匹配的数据
                 </div>)
                }
                if(!this.props.hasMore){
                  return(<div style={{ padding: 30, textAlign: 'center' }}>
                        加载完毕
                 </div>)
                }
              }}
              renderRow={row}
              renderSeparator={separator}
              className="am-list"
              pageSize={pageSize}
              onScroll={() => { console.log('scroll'); }}
              initialListSize={30}
              scrollEventThrottle={200}
              onEndReached={this.onEndReached}
              scrollRenderAheadDistance={500}
              onEndReachedThreshold={10}
              style={{
                overflow: 'auto',
              }}
              renderBodyComponent={() => <MyBody />}
            />
        </div>
      )
    }
  componentWillMount() {
    let t=this;
      let {analysisShopList,salesAnalysisInit}= this.props;
      const {state}=this.props.location;
      let postData={
        shopEntityType:t.state.selectFormat=='all'?'':t.state.selectFormat,
        floor:t.state.selectFloor=='all'?'':t.state.selectFloor,
      }
      analysisShopList(state.dateRange,postData,t.clearDataSource);
      salesAnalysisInit();
    }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 120), 800); // also work
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    // simulate initial Ajax
    setDocumentTitle('店铺销售分析');
    // setTimeout(() => {
    //   this.genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
    //     isLoading: false,
    //   });
    // }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    // if (nextProps.dataSource !== this.props.dataSource) {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //   });
    // }

    let t=this;
    if(nextProps.shopList.pageIndex){

      t.genData(nextProps.shopList.pageIndex-1,nextProps.shopList.rows);
      this.setState({
           dataSource: this.state.dataSource.cloneWithRowsAndSections(t.dataBlob, t.sectionIDs, t.rowIDs),
         });
    }
  }
}


function mapStateToProps(state) {
  return {
    sumDim:state.salesAnalysis.sumDim,//获取下啦展示的楼层和业态
    shopList:state.salesAnalysis.shopList,
    isLoading:state.salesAnalysis.isLoading,
    hasMore:state.salesAnalysis.hasMore,
    dateRange:state.salesAnalysis.dateRange
  }
}

export default connect(mapStateToProps, {
  analysisShopList:salesAnalysisShopList.request,
  nextPageShopList:salesAnalysisNextPageShopList.request,
  salesAnalysisInit:salesAnalysisInit.request,
  //updateCommit:storeDetail.request,
})(SalesAnalysis)
