import './index.less'
import React from 'react';
import Grid from '@gag/grid';
class GridList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    let t=this;
    let {gridList,gridListItemClick}=t.props;
    return (
      <div>
        <Grid data={gridList}
          isCarousel
          columnNum={3}
          hasLine={true}
          onClick={gridListItemClick}
          renderItem={(dataItem, index) => (
            <div className="store-floor-detail">
              <p className="store-floor">{dataItem.dimName}</p>
              <p className="store-sales"><strong>{dataItem.amount}</strong></p>
              <p className="store-sales-rise">{`销售占比${(dataItem.amountPercent*100).toFixed(2)}%`}</p>
            </div>
          )}
        />
      </div>
    )
  }
}
GridList.defaultProps = {
  gridList:[],
};
// DateRange.propTypes = {
//   prefixCls: PropTypes.string,
//   routes:PropTypes.array,
//   params:PropTypes.object,
//   separator:PropTypes.node,
//   itemRender:PropTypes.func,
//   className: PropTypes.string,
// };
GridList.displayName = "GridList";
export default GridList;
