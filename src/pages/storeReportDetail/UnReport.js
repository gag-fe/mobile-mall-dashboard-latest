import React from 'react';
import ListView from '@gag/list-view';
import Flex from '@gag/flex';
import { connect } from 'react-redux';
import {storeReportDetailNextPageUnReport} from '../../actions';
const pageSize =30;
class unReport extends React.Component{
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

      this.state={
         dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      };
    }
    onEndReached = (event) => {
      let t=this;
      console.log(1231,event);
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        debugger
        if(!event){
          return;
        }
        if (t.props.isLoading || !t.props.hasMore) {
          return;
        }
        debugger
        t.props.nextPageUnReport();
      }
    clearDataSource=()=>{
      debugger
        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
      }
  render(){
      let t=this;
      const separator = (sectionID, rowID) => {
        if(!t.dataBlob[rowID]){
          return null;
        }
        return(<div key={`${sectionID}-${rowID}`} style={{
          backgroundColor: '#ECECED',
          height: 1
        }}
        />)
      }
      const row = (rowData, sectionID, rowID) => {
        console.log(rowData);
        debugger
        if(!rowData){
          return null;
        }
        return (
          <div key={rowID} className="store-report-detail-row" onClick={t.props.unReportCallback.bind(null,rowData)}>
              <Flex>
                <Flex.Item>{rowData.date}</Flex.Item>
                <Flex.Item><p className="shop-entity-name">{rowData.shopEntityName}</p></Flex.Item>
                <Flex.Item>{rowData.claimMoneyTotal? rowData.claimMoneyTotal:'--'}</Flex.Item>
                <Flex.Item>{rowData.claimBillTotal? rowData.claimBillTotal:'--'}</Flex.Item>
              </Flex>
          </div>
        );
      };
      return(
          <ListView ref="completeReport"
            dataSource={this.state.dataSource}
            renderHeader={function(){return(<Flex>
                    <Flex.Item>日期</Flex.Item>
                    <Flex.Item>商家</Flex.Item>
                    <Flex.Item>金额</Flex.Item>
                    <Flex.Item>单数</Flex.Item>
                  </Flex>);} }
            renderFooter={() => {
                if(this.props.isLoading){
                  return(<div style={{ padding: 30, textAlign: 'center' }}>
                        加载中...
                 </div>)
                   }
                 if(!this.props.hasMore&&(this.props.unReport.rows.length<=0)){
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
            className="fortest"
            style={{
              overflow: 'auto',
            }}
            pageSize={pageSize}
            onScroll={() => { console.log('scroll'); }}
            initialListSize={30}
            scrollRenderAheadDistance={500}
            scrollEventThrottle={200}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
      )
    }
    componentWillMount() {
      let t=this;
        let {analysisShopList}= this.props;
        debugger
        // let postDataClaim={
        //   token:state.token,
        //   shopId:state.shopId,
        // }
        // let callback=function(data){
        //   debugger
        //   t.genData(1,data);
        //   t.setState({
        //     dataSource: t.state.dataSource.cloneWithRowsAndSections(t.dataBlob, t.sectionIDs, t.rowIDs),
        //     isLoading: false,
        //   });
        // }
         //analysisShopList();
      }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 120), 800); // also work
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    // simulate initial Ajax
    //setDocumentTitle('店铺销售分析');
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
    if(nextProps.unReport.pageIndex){
      debugger
      t.genData(nextProps.unReport.pageIndex-1,nextProps.unReport.rows);
      this.setState({
           dataSource: this.state.dataSource.cloneWithRowsAndSections(t.dataBlob, t.sectionIDs, t.rowIDs),
         });
    }
  }
}


function mapStateToProps(state) {
  return {
    unReport: state.storeReportDetail.unReport,
    isLoading:state.storeReportDetail.unReportLoading,
    hasMore:state.storeReportDetail.unReportMore,
  }
}
export default connect(mapStateToProps, {
  nextPageUnReport:storeReportDetailNextPageUnReport.request,
  // updateCommit:storeDetail.request,
})(unReport)
