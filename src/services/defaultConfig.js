 let defaultConfig = {
    getOrgInfo:'ds/mobile_report/getOrgInfo.json',//查询机构信息
    init:'init.json',
    shopList:'shopList.json',//店铺统计列表
    shops:'shops.json',//机构列表
    claimDetails:'mall/getClaimDetails.json',//手机上报商家明细
    sumDim:'mall/getSumDim.json',//维度聚合
    saleTrend:'mall/getSaleTrend.json',//销售趋势
    dailyReport:'mall/getDailyReport.json',//首页实时销售数据
    methodPost:'POST',
    methodGet:'GET',
};

if(process.env.NODE_PUB){
  let ConfigProd={
    urlPrefix: 'http://dashboard.gooagoo.com/',
    checkLogin: 'https://passport.gooagoo.com/login.do',
    verifyImage:'https://passport.gooagoo.com/verify-image.do',
  }
  defaultConfig=Object.assign(defaultConfig,ConfigProd);
}else{
  let ConfigTest={
    urlPrefix: 'http://data.test.goago.cn/',
    checkLogin: 'https://passport.test.goago.cn/login.do',
    verifyImage:'https://passport.test.goago.cn/verify-image.do',
  }
  defaultConfig=Object.assign(defaultConfig,ConfigTest);
}
export default defaultConfig;
