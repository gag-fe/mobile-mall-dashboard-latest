import Flex from '@gag/flex';
import React from 'react';
import Icon from '@gag/icon';
class RealTimeSales extends React.Component{
  constructor(props) {
    super(props);
    }
  render(){
    let t=this;
      return(
        <div className="realtime-sales">
          <Flex justify='between'>
            <Flex.Item>
                <p className="realtime-sales-translate">{t.props.leftTitle}</p>
                <p className="realtime-sales-translate"><strong>{t.props.leftContent}</strong>{t.props.leftUnit}</p>
            </Flex.Item>
            <Flex.Item>
              <Icon type={require('images/transform.svg')} size='md'/>
            </Flex.Item>
            <Flex.Item>
              <p className="realtime-sales-translate">{t.props.rightTitle}</p>
              <p className="realtime-sales-translate"><strong>{t.props.rightContent}</strong>{t.props.rightUnit}</p>
            </Flex.Item>
          </Flex>
        </div>
      )
    }
}
RealTimeSales.displayName = "RealTimeSales";
RealTimeSales.defaultProps= {
  leftTitle:'结账单',
  rightTitle:'单均消费',
  leftUnit:'单',
  rightUnit:'元',
  leftContent:0,
  rightContent:0,
};
export default RealTimeSales;
