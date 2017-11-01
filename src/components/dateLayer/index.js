import './index.less'
import DatePicker from '@gag/date-picker';
import SegmentedControl from '@gag/segmented-control';
import React from 'react';
import moment from 'moment';
import Flex from '@gag/flex';
class CustomChildren extends React.Component{
  render(){
    return (
    <div onClick={this.props.onClick} className="date-picker-show-value">
      {this.props.children}
      <span>{this.props.extra}</span>
    </div>
  )
  }

}

const getToday=function(){
 return moment().add(0,'days');
}
const getWeekStartVal=function(){
  moment.locale('zh-cn');
 return moment().startOf('week').add(0,'days');
}

const getMonthStartVal=function(){
 return moment().add(0,'days').startOf('month');
}

const toDay=function(){};
toDay.prototype.setDateRange=function(){
  return{
    startValue:getToday(),
    endValue:getToday(),
  }
};
const toWeek=function(){};
toWeek.prototype.setDateRange=function(){
  return{
    startValue:getWeekStartVal(),
    endValue:getToday(),
  }
};
const toMonth=function(){};
toMonth.prototype.setDateRange=function(){
  return{
    startValue:getMonthStartVal(),
    endValue:getToday(),
  }
};
const selectRange=[toDay,toWeek,toMonth];
class DateRange extends React.Component {
  constructor(props) {
    super(props);
        let startValue,endValue;
        startValue=moment(props.fromDay);
        endValue=moment(props.toDay);
        if(props.selectedIndex!=null){
          let dateRange=new selectRange[props.selectedIndex]().setDateRange();
          startValue=dateRange.startValue;
          endValue=dateRange.endValue;
        }

        this.state = {
        selectedIndex:props.selectedIndex,
        startValue: startValue,
        endValue: endValue,
      };
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
    console.log(this.refs.ltq)
    this.refs.end.props.onClick()
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
    this.setState({
      selectedIndex:null
    });
    if(this.props.onEndChangeCallBack){
        this.props.onEndChangeCallBack(this.state.startValue,value);
    }
  }

  onSegmentedChange = (e) => {
    let selectedIndex=e.nativeEvent.selectedSegmentIndex;
    let {startValue,endValue}=new selectRange[selectedIndex]().setDateRange();
    this.setState({
      startValue:startValue,
      endValue:endValue,
      selectedIndex:selectedIndex
    });
    console.log(this.props.onSegmentedChangeCallBack);
    if(this.props.onSegmentedChangeCallBack){
        this.props.onSegmentedChangeCallBack(startValue,endValue,selectedIndex);
    }
  }
  render() {
    const { startValue, endValue,selectedIndex} = this.state;
    const {segmentedControlValues,tintColor}=this.props;
    return (
      <div className="dateLayer">
        <Flex>
          <Flex.Item>
            <SegmentedControl
              prefixCls="date-range-segment"
              selectedIndex={selectedIndex}
              tintColor={tintColor}
              values={segmentedControlValues}
              onChange={this.onSegmentedChange}
              onValueChange={this.onSegmentedValueChange}
            />
          </Flex.Item>
          <Flex.Item>
            <DatePicker
                mode="date"
                title="选择日期"
                onChange={this.onStartChange}
                value={startValue}
                maxDate={endValue}
              >
                <CustomChildren></CustomChildren>
              </DatePicker>
          </Flex.Item>
          <span className="space"> 至 </span>
          <Flex.Item>
            <DatePicker
              mode="date"
              title="选择日期"
              onChange={this.onEndChange}
              value={endValue}
              minDate={startValue}
              maxDate={getToday()}
            >
            <CustomChildren ref="end"></CustomChildren>
            </DatePicker>
          </Flex.Item>
        </Flex>
      </div>

    );
  }
  componentWillReceiveProps(nextProps) {
    let startValue=moment(nextProps.fromDay);
    let endValue=moment(nextProps.toDay);
    this.setState({
        selectedIndex:nextProps.selectedIndex,
        startValue: startValue,
        endValue: endValue,
       });
  }
}
DateRange.defaultProps = {
  segmentedControlValues:['今天', '本周', '本月'],
  tintColor:null,
  selectedIndex:0,
};
// DateRange.propTypes = {
//   prefixCls: PropTypes.string,
//   routes:PropTypes.array,
//   params:PropTypes.object,
//   separator:PropTypes.node,
//   itemRender:PropTypes.func,
//   className: PropTypes.string,
// };
DateRange.displayName = "DateRange";

export default DateRange;
