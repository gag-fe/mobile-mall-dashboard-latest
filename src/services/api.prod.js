import nattyFetch from 'natty-fetch';
import defaultConfig from './defaultConfig';

let pageConfig = window.pageConfig || {};
    pageConfig=Object.assign(pageConfig,defaultConfig);
// if (window.pageConfig) {
//     window.pageConfig.urlPrefix = '/';
// }


nattyFetch.setGlobal({
    fit: function (response) {
        if(response.status.toLowerCase()=='t'||response.status.toLowerCase()=='timeout'){
        debugger
          window.localStorage.setItem('__LOGIN_STATUS__',false);
          window.location.href=window.location.origin+'/#/login';//||localStorage.getItem('LOGINURL');
        }
        return {
            success: (response.status.toLowerCase()=='s'||response.status.toLowerCase()=='success'),
            content: response.data,
            error: {message: response.msg , status:response.status}
        }
    },
    ignoreSelfConcurrent: true,
    data:{
        //token:'1BG7VI6EU0OEQI001GKNO3G1GVCVCM09'
    }
})
let DBC = nattyFetch.context({
    urlPrefix: pageConfig.urlPrefix,
    //withCredentials:false
});

DBC.create({
    'login.checkLogin': {
        fit: function (response) {
          debugger
            return {
                success: response.status.toLowerCase()=="ok",
                content: response.body,
                error: {message:response.message}
            }
        },
        url: pageConfig.checkLogin,
        method: pageConfig.methodPost,
        //header:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        withCredentials:true
    },
    'mallManage.shops':{
      url: pageConfig.shops,
      method: pageConfig.methodPost
    },
    'mallManage.dailyReport':{
      url: pageConfig.dailyReport,
      method: pageConfig.methodGet,
    },
    'mallManage.saleTrend':{
      url: pageConfig.saleTrend,
      method: pageConfig.methodPost
    },
    'mallManage.sumDim':{
      url: pageConfig.sumDim,
      method: pageConfig.methodPost
    },
    'salesAnalysis.shopList':{
      ignoreSelfConcurrent: false,
      url: pageConfig.shopList,
      method: pageConfig.methodPost
    },
    'salesAnalysis.init':{
      url: pageConfig.init,
      method: pageConfig.methodPost
    },
    'storeReportDetail.claimDetails':{
      url: pageConfig.claimDetails,
      method: pageConfig.methodPost
    },
    'storeDetail.updateCommit':{
      willFetch:function(vars,config){
        debugger
        if(config.url.search(/\?token=/)==-1){
          config.url=config.url+'?token='+window.TOKEN
        }
      },
      url: pageConfig.commit,
      method: pageConfig.methodPost,
      header: {
            'Content-Type': 'application/json'
        }
    },
});


module.exports = DBC.api;
