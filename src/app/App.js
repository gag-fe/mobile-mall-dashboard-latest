import React from 'react';
import {render} from 'react-dom';
import Container from 'components/container/src';
import SystemNotice from '@gag/system-notice';
import attachFastClick from 'fastclick';
class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    }
    componentDidMount() {
      //attachFastClick(document.body);
      render(
          <SystemNotice entryId="03" scrollamount="6"></SystemNotice>,
       document.getElementById('system-notice-wrap'));
    }
    render() {
      const {
        location,
        params,
        children
        } = this.props;
      const transition = children.props.transition || 'fade';
      return ( < Container
        id = "sk-container"
        transition = {
          transition
        }
        // fade transition example
        // transition='fade'
        // transitionEnterTimeout={450}
        // transitionLeaveTimeout={300}
        >
        {
          React.cloneElement(children, {key: location.pathname})}
        < /Container>
      );
    }
  }
 export default App
