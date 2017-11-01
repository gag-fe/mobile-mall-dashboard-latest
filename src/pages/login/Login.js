import './Login.less';
import React from 'react';
import List from '@gag/list';
import InputItem from '@gag/input-item';
import Button from '@gag/button';
import WhiteSpace from '@gag/white-space';
import WingBlank from '@gag/wing-blank';
import Icon from '@gag/icon';
import Checkbox from '@gag/checkbox';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultConfig from '../../services/defaultConfig';
const AgreeItem = Checkbox.AgreeItem;
import {login,setDocumentTitle} from '../../actions'
import {
  createForm
}
from 'rc-form';
class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        verifyRandom: Math.random(),
        rememberPassword:props.loginInfo.rememberPassword,
      };
    }
  componentWillMount() {
    setDocumentTitle("登录");
    //window.localStorage.setItem('LOGINURL',window.location.href);
    //window.LOGINURL=window.location.href;
  }
  componentDidMount() {
    let t=this;
  }
  handleSubmit(e) {
    let t = this;
    e.preventDefault();
    let callback=function(){
      window.localStorage.setItem('__LOGIN_STATUS__',true);
      if (t.props.location.state&&t.props.location.state.nextPathname) {
        t.props.router.replace({pathname:location.state.nextPathname});
      } else {
        t.props.router.replace({pathname:'/mallManage'});
      }
    }
    t.props.form.validateFields((error, values) => {
      if (!error) {
        let postData={
          account:values.account,
          password:values.password,
          verifyCode:values.validityCode,
          rememberPassword:t.state.rememberPassword,
        }
        this.props.login(postData,callback,t.resetVerify);
      } else {
        console.log('error', error, values);
      }
    });
  }
  resetVerify=()=>{
    this.setState({
      verifyRandom: Math.random()
    });
  }
  validityChange = (e) => {
    e.preventDefault();
    this.setState({
      verifyRandom: Math.random()
    });
  }
  OnAgreeRemember=(e)=>{
    this.setState({
      rememberPassword:!this.state.rememberPassword,
    });
  }

  render() {
    let t=this;
    let verifyImgUrl=defaultConfig.verifyImage+'?r='+this.state.verifyRandom;
    const { getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    const accountErrors = getFieldError('account');
    const passwordErrors = getFieldError('password');
    const validityCodeErrors = getFieldError('validityCode');
    return (
    <div id="box-login">
      <div className="logo">
        <img  class="img" src={require('images/logo_zd.png')}></img>
      </div>
      < List>
      < InputItem
            {
              ...getFieldProps('account', {
                  initialValue: t.props.loginInfo.account,
                  validateFirst: true,
                  rules:[{required: true, message: '账户不能为空',}],
                  validateTrigger: 'onBlur',
                })
            }
            placeholder = "请输入用户名" >
            <Icon type={require('images/people.svg')} size='md'/>
      < /InputItem>
      < InputItem
          {...getFieldProps('password', {
          initialValue: t.props.loginInfo.password,
          validateFirst: true,
          rules:[{required: true, message: '密码不能为空',}],
          validateTrigger: 'onBlur',
        })}
        type = "password"
        placeholder = "请输入密码" >
        <Icon type={require('images/safe.svg')} size='md'/>
      < /InputItem>
      < InputItem
          {...getFieldProps('validityCode', {
          rules:[{required: true, message: '验证码不能为空',}],
          validateTrigger: 'onBlur',
        })}
        onExtraClick={this.validityChange}
        extra={<img className="validity-image" src={verifyImgUrl}/>}
        type = "verity"
        placeholder = "请输入验证码" >
        <Icon type={require('images/verify.svg')} size='md'/>
      < /InputItem>
      <WhiteSpace size="xl" />
        <AgreeItem  onChange={t.OnAgreeRemember} checked={t.state.rememberPassword}>
            记住用户名和密码
        </AgreeItem>
      <WhiteSpace size="xl" />
      <WingBlank size="md"><Button className="btn" type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button></WingBlank>
      < /List>
      {
      accountErrors?<div className="error-style">
        { accountErrors.join(',')}
      </div> : null
      }
      {passwordErrors?
      <div className="error-style">
        {passwordErrors.join(',')}
      </div>: null
      }
      {validityCodeErrors?
      <div className="error-style">
        {validityCodeErrors.join(',')}
      </div>: null
      }
    </div>
    )
  }
}

Login.propTypes = {
  // Injected by React Redux
  //orgInfo: PropTypes.object,
  // inputValue: PropTypes.string.isRequired,
  // navigate: PropTypes.func.isRequired,
  // updateRouterState: PropTypes.func.isRequired,
  // resetErrorMessage: PropTypes.func.isRequired,
  // // Injected by React Router
  // children: PropTypes.node
}

function mapStateToProps(state) {
  window.localStorage.setItem('__INITIAL_LOGIN__',JSON.stringify(state.login));
  return {
    loginInfo:state.login,
  }
}

const ExportLogin=connect(mapStateToProps, {
  login:login.request,
})(Login)
export default createForm()(ExportLogin);
