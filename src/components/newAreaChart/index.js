import './index.less';
import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid,Legend, Tooltip,ResponsiveContainer} from 'recharts';
//const cardinal = d3.curveCardinal.tension(0.2);
const TooltipItem  =(props)=>{
        const {name,value} = props;
        return (
              <li className="recharts-tooltip-item">
                <span className="recharts-tooltip-item-name">{name}</span>
                <span className="recharts-tooltip-item-separator"> : </span>
                <span className="recharts-tooltip-item-value">{value}</span>
              </li>
        );
};
const CustomTooltip  =(props)=>{
      const { active } = props;
      if (active) {
        debugger
        const { payload, label,labelFormatter} = props;
        let comparedAmountRate=(payload[0].payload.comparedAmountRate* 100).toFixed(2)+'%';
        return (
          <div className="recharts-default-tooltip">
            <p className="recharts-tooltip-label" >{labelFormatter(label)}</p>
            <ul className="recharts-tooltip-item-list">
              {
                payload.map((entry, index) => <TooltipItem key={`item-${index}`} name={entry.name} value={entry.value}/>)
              }
              {
                payload.length>=2?<TooltipItem key={`item-compare`} name={'环比增长'} value={comparedAmountRate}/>:null
              }
            </ul>
          </div>
        );
      }
    return null;
};
class NewAreaChart extends React.Component{
  toPercent=(date, fixed,z) => {
    const {initAreaChartName}=this.props;
  	return `${initAreaChartName.formatter(date)}`;
  }
  labelFormatter=(date) => {
    const {initAreaChartName}=this.props;
    return `${initAreaChartName.formatter(date)}`;
  }
  render () {
    const {chartData,initAreaChartName}=this.props;
    let intervalName=0;
    if(chartData&&chartData.length>24){
      intervalName=parseInt(chartData.length/12);
    }
    return (
      <ResponsiveContainer width="95%" height={600} >
      <AreaChart data={chartData}
            margin={{top: 20, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="date" tickFormatter={this.toPercent} height={50} interval={intervalName} label={initAreaChartName.unit}/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Legend verticalAlign="top" iconType='circle'/>
        <Tooltip labelFormatter={this.labelFormatter} content={<CustomTooltip/>} wrapperStyle={{borderRadius: '10px',
            backgroundColor:'rgba(58,58,58,.8)'
        }}
        itemStyle={{color:'#fff'}}
        />
        <Area type='monotone' name={initAreaChartName.now} dataKey='saleAmount' stackId="1" stroke='#F8D040' fill='#F8D040' />
        {
          initAreaChartName.next?<Area type='monotone' name={initAreaChartName.next} dataKey='comparedAmount' stackId="1" stroke='#96ABFF' fill='#96ABFF' />:null
        }
      </AreaChart>
       </ResponsiveContainer>
    );
  }
}


NewAreaChart.defaultProps={
  chartData:[],
  initAreaChartName:{},
}
NewAreaChart.displayName = "NewAreaChart";
export default NewAreaChart;
