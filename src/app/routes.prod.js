import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import {mallManageReset} from '../actions';
import {
  Router,
  Route,
  IndexRoute,
}
from 'react-router';
// import Login from 'pages/login';
// import MallManage from 'pages/mallManage';
// import StoreReportDetail from 'pages/storeReportDetail';
// import SalesAnalysis from 'pages/salesAnalysis';
// import SingleStoreReportDetail from 'pages/singleStoreReportDetail';
// import NotFound from 'pages/notFound/NotFound';
// import App from './App';
class Root extends React.Component {
   hasLogin() {
      return window.localStorage.getItem('__LOGIN_STATUS__') === 'true';
    }
    requireAuth=(nextState, replaceState)=>{
      debugger
      if (this.hasLogin()) {
        replaceState('/mallManage');
      }else{
        this.props.mallManageReset();
      }
    }
    render() {
      const {store, history} = this.props
      const routes={
          path:'/',
          getComponent(nextState,callback){
            require.ensure([],require=>{
              callback(null,require('./App'));
            },'App');
          },
          indexRoute:{
            onEnter:this.requireAuth,
            getComponent(nextState,callback){
              require.ensure([],require=>{
                callback(null,require('pages/login'));
              },'login');
            }
          },
        childRoutes:[
          {
          onEnter:this.requireAuth,
          path:'login',
          getComponent(nextState,callback){
            require.ensure([],require=>{
              callback(null,require('pages/login'));
            },'login');
           }
        },
        {
          path:'mallManage',
          getComponent(nextState,callback){
            require.ensure([],require=>{
              callback(null,require('pages/mallManage'));
            },'mallManage');
           }
        },
      {
        path:'storeReportDetail',
        getComponent(nextState,callback){
          require.ensure([],require=>{
            callback(null,require('pages/storeReportDetail'));
          },'storeReportDetail');
        }
      },
      {
        path:'salesAnalysis',
        getComponent(nextState,callback){
          require.ensure([],require=>{
            callback(null,require('pages/salesAnalysis'));
          },'salesAnalysis')
        }
      },
      {
        path:'singleStoreReportDetail',
        getComponent(nextState,callback){
          require.ensure([],require=>{
            callback(null,require('pages/singleStoreReportDetail'));
          },'singleStoreReportDetail')
        }
      },
      {
        path:'*',
        getComponent(nextState,callback){
          require.ensure([],require=>{
            callback(null,require('pages/notFound/NotFound'));
          },'NotFound')
        }
      }
    ]
    };
      // const routes=(
      //   < Route path = "/" component = {App}>
      //     < IndexRoute component = {Login}/>
      //     < Route path = "/login" component = {Login}/>
      //     < Route path = "/mallManage" component = {MallManage}/>
      //     < Route path = "/salesAnalysis"component = {SalesAnalysis}/>
      //     < Route path = "/storeReportDetail" component = {StoreReportDetail}/>
      //     < Route path = "/singleStoreReportDetail" component = {SingleStoreReportDetail}/>
      //     < Route path = "*" component = {NotFound}/>
      //       {/*
      //       < Redirect from = "/" to = "/archives/posts"/>
      //       < Route path = "/fillPersonnalInfo/:id" component = {FillPersonnalInfo}/>
      //       < Route path = "about" component = {About}/>
      //       < Route onEnter = {this.requireAuth} path = "/archives" component = {Archives} >
      //       < Route path = "posts" components = {{original: Original,reproduce: Reproduce,}}/>
      //       < /Route>
      //       < Route path = ":page" component = {Page}/>*/}
      //   < /Route>
      // );
      return (
        <Provider store={store}>
            < Router history = {history} routes={routes}>
            < /Router>
        </Provider>
      );
    }
  }
  Root.displayName = "Root";
  Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  export default connect(null, {
  mallManageReset:mallManageReset,
  })(Root)
