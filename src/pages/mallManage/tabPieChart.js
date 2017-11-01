import Tabs from '@gag/tabs';
import PieChart from 'components/pieChart';
import GridList from 'components/gridList';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;
class TabPieChart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeKey:1
      };
  }
  callback(key) {
    //console.log('onChange', key);
  }
  handleTabClick=(key)=>{
    this.setState({
      activeKey:key,
    })
  }
  onRouteSaleAnalysis=(formatOrfloor,index)=>{
    let t=this;
    const {
      router
    } = t.context;
    let location=router.location;
    let state={dateRange:t.props.dateRange};
    if(t.state.activeKey==1){
      state.format=formatOrfloor
    }else{
      state.floor=formatOrfloor
    }
    router.push({pathname:'/salesAnalysis',query:location.query,state:state});
  }
  render(){
    let t=this;
    let {sumDim}=t.props;
    return(
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback} onTabClick={this.handleTabClick} swipeable={false } animated={false}>
          <TabPane tab="业态" key="1">
            <PieChart  chartData={sumDim.categoryRoot}></PieChart>
          </TabPane>
          <TabPane tab="楼层" key="2">
            <PieChart chartData={sumDim.shopFloor}></PieChart>
          </TabPane>
        </Tabs>
        <GridList gridList={t.state.activeKey==1?sumDim.categoryRoot:sumDim.shopFloor} gridListItemClick={t.onRouteSaleAnalysis} ></GridList>
      </div>
    )
  }
}
TabPieChart.displayName = "TabPieChart";
TabPieChart.contextTypes = {
    router: PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
  return {
    sumDim:state.mallManage.sumDim,
    dateRange:state.mallManage.dateRange,
  }
}

export default connect(mapStateToProps, {
})(TabPieChart)
