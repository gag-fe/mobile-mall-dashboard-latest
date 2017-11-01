import React from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
const Stat = G2.Stat;
const Frame = G2.Frame;
class PieChart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        forceFit: true,
        width: 750,
        height: 600,
        plotCfg: {
          margin: [100, 40, 80, 40]
        },
      };
  }
  render() {
    const {chartData,displayType}=this.props;
     let frame = new Frame(chartData);
     //const totalAmount=Frame.sum(frame,'amount');
    const Chart = createG2(chart => {
      chart.col('amount', {
        min: 0,
      });
      chart.coord('polar',{inner: 0.3,radius:500});
      chart.axis('amount', {
        labels: null
      });
      chart.axis('dimName', {
        gridAlign: 'middle',
        labelOffset: 30,
        labels: {
          label: {
            fontSize:36,
            fill:'#999',
            textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
          }
        }
      });
      chart.axis('amount', {
        gridAlign: 'middle',
        labelOffset: 10,
        labels: {
          label: {
            fontSize:24,
            fill:'#999',
            textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
          }
        }
      });
      chart.tooltip(true, {
          custom: true, // 使用自定义的 tooltip
        });
      // chart.legend('dimName', {
      //   itemWrap: true, // 图例换行，将该参数设置为 true, 默认为 false，不换行。
      //   position: 'top', // 设置图例的显示位置
      //   spacingX: 40, // 图例项之间的水平间距
      //   word:{
      //     fontSize:36,
      //     fill:'#666'
      //   }
      // });
      chart.legend(false);
      chart.interval().position('dimName*amount')
        .color('dimName');//['#F8B348','#FAD02F','#F67764','#87B4FF','#4EBF73']
        // .label('amount',{offset: -15,label: {textAlign: 'center', fontWeight: 'bold',fontSize:36},renderer:function(text, item, index) {
        //     let amountPercent=item.point.amountPercent;
        //     let percent = (amountPercent * 100).toFixed(2) + '%';
        //     return percent;
        //   }})
        // .style({
        //   lineWidth: 1,
        //   stroke: '#fff'
        // });
      chart.render();
      chart.on('tooltipchange', function(ev) {
          let items = ev.items; // tooltip显示的项
          let origin = items[0]; // 将一条数据改成多条数据
          let amountPercent = origin.point._origin.amountPercent;
          items.splice(0); // 清空
          items.push({
            name: origin.name,
            title: origin.title,
            marker: true,
            color: origin.color,
            value: origin.value
          });
          items.push({
            name: '占比',
            marker: true,
            title: origin.title,
            color: origin.color,
            value: (amountPercent * 100).toFixed(2) + '%'
          });
        });
    });
    return (
      <div>
        <Chart
          data={chartData}
          width={this.state.width}
          height={this.state.height}
          plotCfg={this.state.plotCfg}
          forceFit={this.state.forceFit} />
  </div>
    );
  }
}
PieChart.defaultProps={
  chartData:[],
}
PieChart.displayName = "PieChart";

export default PieChart;
