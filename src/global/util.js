var util = {};
util.lowVersionIE = function () {
    return document.all && !!(window.ActiveXObject || "ActiveXObject" in window);
}
util.makeIEWarn = function () {
    return <div className="alert-ie">
            <div className="alert-ie-tip">
                <i className="kuma-icon kuma-icon-caution"></i>
                <span className="alert-ie-text">您的浏览器版本太低, 请使用Chrome、Firefox或IE11+等最新浏览器!</span>
            </div>
        </div>
}

util.toHour =  function (millisecond) {

    if(typeof(millisecond) == 'undefined' || isNaN(millisecond)){
        return null
    }

    var hourUnit = 60 * 60 * 1000;
    var hour = millisecond / hourUnit;
    var minute = millisecond % hourUnit;
    minute = minute / (60 * 1000);

    return {
        hour : Math.floor(hour),
        minute: Math.floor(minute)
    }
}
/**加密算法*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHex() {
  let n = 0;
  for (let i = 4; i > 0; i--) {
    n = (getRandomInt(0, 1) << (i - 1)) + n;
  }
  return n.toString(16);
}

function getOTP() {
  const arr = [];
  for (let i = 0; i < 32; i++) {
    arr.push(getHex());
  }
  return arr.join('');
}
function toFixedNumber(value,times=1){
  if(!value){
    value=0;
  }
  return (value*times).toFixed(2);
}
function getXOR(message, key) {
  const arr = [];
  for (let i = 0; i < 32; i++) {
    const  m = message.substr(i, 1).charCodeAt();
    const k = parseInt(key.substr(i, 1), 16);
    arr.push(String.fromCodePoint((m ^ k)));
  }
  return arr.join('');
}
/**以下是处理shops的工具函数*/
const flatIntoComplex=function(initData){this.initData=initData};
flatIntoComplex.prototype.deepCopy=function(p, c){
  　　　　var c = c || {};
  　　　　for (var i in p) {
  　　　　　　if (typeof p[i] === 'object') {
  　　　　　　　　c[i] = (p[i] instanceof Array) ? [] : {};
  　　　　　　　　this.deepCopy(p[i], c[i]);
  　　　　　　} else {
  　　　　　　　　　c[i] = p[i];
  　　　　　　}
  　　　　}
  　　　　return c;
　　};
flatIntoComplex.prototype.findRootNode=function(list){
  for (let i=0; i<this.initData.length; i++) {
      if(this.initData[i].parentId==-1){
      let RootNode=this.deepCopy(this.initData[i]);
          RootNode.children=[];
          list.push(RootNode);
          this.initData.splice(i--,1);
      }
  };
  return list;
};
flatIntoComplex.prototype.haveChild=function(list){
    if (list instanceof Array&&list.length) {
       for(var i=0;i<list.length;i++){
          this.leafNode(list[i]);
      }
    }else{
        return list;
    }
};
flatIntoComplex.prototype.leafNode=function(value){
    if(!value.children){
        return value;
    }
    for (var i=0; i<this.initData.length; i++) {
            if(this.initData[i].parentId==value.id){
            let childNode=this.deepCopy(this.initData[i]);
                childNode.children=[];
                value.children.push(childNode);
                this.initData.splice(i--,1);
                }
            }
    return this.haveChild(value.children);

};
export const throttle=function(fn,interval){
  let __self=fn,
  timer,
  firstTime=true;
  return function(){
    let args=arguments,
    __me=this;
    if(firstTime){
      __self.apply(__me,args);
      return firstTime=false;
    }
    if(timer){
      return false;
    }
    timer=setTimeout(function(){
      clearTimeout(timer);
      timer=null;
      __self.apply(__me,args);
    },interval||500)
  }
}
export {getRandomInt, getHex, getOTP, getXOR,flatIntoComplex,toFixedNumber};
