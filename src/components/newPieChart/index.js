import './index.less'
import React from 'react';
import{PieChart, Pie, Legend,Cell,ResponsiveContainer,Tooltip} from 'recharts';
const COLORS = ['#38BF77','#FFB355','#FFD047','#FE7668','#7EB5FF','#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

class NewPieChart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      };
  }
  renderActiveShape = (props) => {
    const { cx, cy, midAngle, outerRadius,
      fill,amountPercent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={7} textAnchor={textAnchor} fill="#999">
          {`${(amountPercent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  }
  render () {
    debugger
    const {chartData}=this.props;
  	return (
      <ResponsiveContainer width="95%" height={500} >
    	<PieChart onMouseEnter={this.onPieEnter}>
      <Legend verticalAlign="top" iconType='circle'/>
        <Tooltip
        wrapperStyle={{borderRadius: '10px',
            backgroundColor:'rgba(58,58,58,.5)'
        }}
        itemStyle={{color:'#fff'}}
        />
        <Pie
          data={chartData}
          isAnimationActive={false}
          label={this.renderActiveShape}
          nameKey='dimName'
          valueKey='amount'
          innerRadius={80}
          outerRadius={180}
          fill="#8884d8"
        >
        	{
          	chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    );
  }
}
NewPieChart.defaultProps={
  chartData:[],
}
NewPieChart.displayName = "NewPieChart";

export default NewPieChart;
