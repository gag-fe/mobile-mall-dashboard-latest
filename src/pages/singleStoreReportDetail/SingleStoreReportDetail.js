import './SingleStoreReportDetail.less';
import React from 'react';
import ListView from '@gag/list-view';
import Flex from '@gag/flex';
import moment from 'moment';
import { connect } from 'react-redux';
import {singleStoreReportDetailClaimDetails,setDocumentTitle} from '../../actions'
  //let index = data.length - 1;

const pageSize =62;
class SingleStoreReportDetail extends React.Component {
    constructor(props) {
      super(props);
      debugger
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
        this.sectionIDs = [].concat(this.sectionIDs);
        this.rowIDs = [].concat(this.rowIDs);
      };

      this.state = {
        dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      };
    }
    componentWillMount() {
      let t=this;
      const {state}=t.props.location;
      let postData={
        shopEntityId:state.singleStoreClaimData.shopEntityId,
        fromDay:moment(new Date()).subtract(1,'months').format('YYYY-MM')+'-01',
        toDay:moment(new Date()).format('YYYY-MM-DD'),
        pageIndex:1,
        pageSize:62,
        reverse:1,
        sortBy:'date',
        isClaimed:-1
      }
      t.props.singleStoreClaimData(postData);
    }
    componentDidMount() {
      let t=this;
      const {state}=t.props.location;
      setDocumentTitle(state.singleStoreClaimData.shopEntityName);
    }
    componentWillReceiveProps(nextProps) {
      let t=this;
      if(nextProps.historyData.pageIndex){
        debugger
        t.genData(nextProps.historyData.pageIndex-1,nextProps.historyData.rows);
        this.setState({
             dataSource: this.state.dataSource.cloneWithRowsAndSections(t.dataBlob, t.sectionIDs, t.rowIDs),
           });
      }
    }

    onEndReached = (event) => {
    }

    render() {
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
        let review=''
        switch (rowData.isClaimed) {
          case 0:
            review='未上报'
            break;
          default:
            review='已上报'
        }
        return (
          <div key={rowData.date} className="singleRow">
              <Flex>
                <Flex.Item>{rowData.date}</Flex.Item>
                <Flex.Item>{rowData.isClaimed==0?'--':rowData.claimMoneyTotal}</Flex.Item>
                <Flex.Item>{rowData.isClaimed==0?<span style={{color:'red'}}>{review}</span>:review}</Flex.Item>
              </Flex>
          </div>
        );
      };

      return (

        <div id='single-store-report-detail'>
          <ListView ref="lv"
            dataSource={this.state.dataSource}
            renderHeader={function(){return(<Flex>
              <Flex.Item>日期</Flex.Item>
              <Flex.Item>上报金额</Flex.Item>
              <Flex.Item>上报状态</Flex.Item>
            </Flex>);} }
            renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
              {this.props.isLoading ? '加载中...' : '加载完毕'}
            </div>}
            renderRow={row}
            renderSeparator={separator}
            className="single-store-report-detail"
            pageSize={pageSize}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            initialListSize={30}
            stickyHeader
            stickyProps={{
              stickyStyle: { zIndex: 999, WebkitTransform: 'none', transform: 'none' },
              // topOffset: -43,
              // isActive: false, // 关闭 sticky 效果
            }}
            stickyContainerProps={{
              className: 'for-stickyContainer',
            }}
          />
        </div>

      );
    }
  }
  function mapStateToProps(state) {
    return {
      historyData:state.singleStoreReportDetail.historyData,
    }
  }

  export default connect(mapStateToProps, {
  singleStoreClaimData:singleStoreReportDetailClaimDetails.request,
  })(SingleStoreReportDetail)
