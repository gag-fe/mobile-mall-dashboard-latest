import './index.less';
import React from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
const Stat = G2.Stat;
class AreaChart extends React.Component{
      constructor(props) {
        super(props);
        this.state = {
          forceFit: true,
          width: 750,
          height: 600
        };
      }
      render() {
        const {chartData,initAreaChartName}=this.props;
        const Frame = G2.Frame;
        let frame = new Frame(chartData);
        frame.addCol('title', function(obj) {
          return initAreaChartName.formatter(obj.date)
        });
        let compareAnalysis=['saleAmount','comparedAmount'];
        if(!initAreaChartName.next){
          compareAnalysis=['saleAmount']
        }

        frame = Frame.combinColumns(frame,compareAnalysis,'value','type',['date','title']);
        const Chart = createG2(chart => {
          // chart.col('value', {
          //   //alias: 'The Share Price in Dollars',
          //   formatter: function(val) {
          //     return val+'元';
          //   }
          // });
          chart.col('type', {
            //alias: 'The Share Price in Dollars',
            formatter: function(val) {
              if(val==='saleAmount'){
                  return initAreaChartName.now;
              }
              return initAreaChartName.next;

            }
          });
          chart.axis('value', {
              labels: {
                label: {
                  textAlign: 'right', // 文本对齐方向，可取值为： left center right
                  fill: '#999', // 文本的颜色
                  fontSize: '18', // 文本大小
                }
              },
              title: null // 不展示标题
            });
          chart.animate(false);
          chart.axis('date', {
            titleOffset: 80,
            title: {
                  fontSize: '28', // 文本大小
                  textAlign: 'left', // 文本对齐方式
                  fill: '#999', // 文本颜色
                },
              labels: {
                autoRotate: true, // 文本是否允许自动旋转
                label: {
                  textAlign: 'center', // 文本对齐方向，可取值为： left center right
                  fill: '#999', // 文本的颜色
                  fontSize: '18', // 文本大小
                }
              },
              formatter: initAreaChartName.formatter
            });

          chart.legend({
            position: 'top', // 设置图例的显示位置
            spacingX: 60, // 图例项之间的水平间距
            word:{
              fontSize:36,
              fill:'#666'
            }
          });
          chart.col('date', {
            type:'cat',
            alias:initAreaChartName.unit,
            tickCount:initAreaChartName.tickCount,
            range:[0,1],
          });
          chart.tooltip(true,{
              map:{
                title:'title'
              },
              custom: true, // 使用自定义的 tooltip
              offset: 50,
            });
          chart.area().position('date*value').color('type',['#F8D040','#96ABFF']).shape('smooth').tooltip('title');
          //chart.line().position('year*value').color('type').size(2).shape('smooth');
          chart.render();
          chart.on('tooltipchange', function(ev) {
              let items = ev.items; // tooltip显示的项
              let origin = items.slice();
              items.splice(0);
              for (var i = 0; i < origin.length; i++) {
                let _origin=origin[i].point._origin;
                let name=initAreaChartName.next;
                if(_origin.type==='saleAmount'){
                    name=initAreaChartName.now;
                }
                items.push({
                  name: name,
                  title: origin[i].title,
                  marker: true,
                  color: origin[i].color,
                  value: _origin.value
                });
              }
            });
        });

        return (
          <div>
            <Chart
              data={frame}
              width={this.state.width}
              height={this.state.height}
              plotCfg={{
                margin: [50,50,100,90]
              }}
              forceFit={this.state.forceFit} />
      </div>
        );
      }
    }
AreaChart.defaultProps={
  chartData:[],
  initAreaChartName:{},
}
AreaChart.displayName = "AreaChart";

export default AreaChart;
