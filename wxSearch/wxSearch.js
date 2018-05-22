// 定义数据格式

/***
 * 
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 * 
 * 
 */
var __keysColor = [];

var __mindKeys = [];

function initColors(colors){
    __keysColor = colors;
}

function initMindKeys(keys){
    __mindKeys = keys;
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
    var temData = {};
    var view = {
        barHeight: barHeight,
        isShow: false
    }
    
    if(typeof(isShowKey) == 'undefined'){
        view.isShowSearchKey = true;
    }else{
        view.isShowSearchKey = isShowKey;
    }

    if(typeof(isShowHis) == 'undefined'){
        view.isShowSearchHistory = true;
    }else{
        view.isShowSearchHistory = isShowHis;
    }
    temData.keys = keys;
    wx.getSystemInfo({
        success: function(res) {
            var wHeight = res.windowHeight;
            view.seachHeight = wHeight-barHeight;
            temData.view = view;
            that.setData({
                wxSearchData: temData
            });
        }
    })
    
    if (typeof (callBack) == "function") {
        callBack();
    }
    
    getHisKeys(that);
}

function wxSearchInput(e, that, callBack){
    var temData = that.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];
    var inits = [];
    console.log(text)
    // wx.request({
    //   url: 'https://api.mongoliaci.com/api/product/list/37fb591be38db52dd1d5f04b689008f6?name='+text, //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log((res.data.data.data).length)
    //     for (var i = 0; i < (res.data.data.data).length; i++) {
    //       inits.push(res.data.data.data[i].name);
    //       // console.log(res.data.data.data);
    //       // console.log(res.data.data.data[i].name);
    //       // console.log(inits);
    //       initMindKeys(inits);

    //     }
        
    //   }
    // })

    if(typeof(text) == "undefined" || text.length == 0){
        
    }else{
      console.log(mindKeys)
        for(var i = 0; i < __mindKeys.length; i++){
            var mindKey = __mindKeys[i];
            if(mindKey.indexOf(text) > -1){
                mindKeys.push(mindKey);
            }
        }
    }
    temData.value = text;
    temData.mindKeys = mindKeys;
    that.setData({
        wxSearchData: temData
    });
    console.log(mindKeys)
}

function wxSearchFocus(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.view.isShow = true;
    that.setData({
        wxSearchData: temData
    });
    //回调
    if (typeof (callBack) == "function") {
        callBack();
    }
    // if(typeof(temData) != "undefined"){
    //   temData.view.hidden= false;
    //   that.setData({
    //     wxSearchData:temData
    //   });
    // }else{

    // }
}
function wxSearchBlur(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.value = e.detail.value;
    console.log('失去焦点'+temData.value)
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}

function wxSearchHiddenPancel(that){
    var temData = that.data.wxSearchData;
    temData.view.isShow = false;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchKeyTap(e, that, callBack) {
    //回调
  setTimeout(function () {
    console.log(e.target.dataset.key)
    var temData = that.data.wxSearchData;
    // temData.view.isShow = true;

    temData.value = e.target.dataset.name;
    var what = e.target.dataset.name
    console.log(what)
    that.setData({
      wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
      callBack();
    } 
       ;},300)
    wx.navigateTo({
      url: '../product/product?id='+e.target.dataset.key,
    })
  
}
function getHisKeys(that) {
    var value = [];
    try {
        value = wx.getStorageSync('wxSearchHisKeys')
        if (value) {
            // Do something with return value
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        }
    } catch (e) {
        // Do something when catch error
    }
    
}
function wxSearchAddHisKey(that) {
    // wxSearchHiddenPancel(that);
    // var text = that.data.wxSearchData.value;
    // console.log(text)
    // if(typeof(text) == "undefined" || text.length == 0){return;}
    // var value = wx.getStorageSync('wxSearchHisKeys');
    // if(value){
    //     if(value.indexOf(text) < 0){
    //         value.unshift(text);
    //     }
    //     wx.setStorage({
    //         key:"wxSearchHisKeys",
    //         data:value,
    //         success: function(){
    //             getHisKeys(that);
    //         }
    //     })
    // }else{
    //     value = [];
    //     value.push(text);
    //     wx.setStorage({
    //         key:"wxSearchHisKeys",
    //         data:value,
    //         success: function(){
    //             getHisKeys(that);
    //         }
    //     })
    // }
  var temData = that.data.wxSearchData;
  var text = that.data.wxSearchData.value;
  temData.view.isShow = true;
  // var text = e.detail.value;
  var mindKeys = [];
  var inits = [];
  console.log(text)
  if(text==""||text==undefined){
    wx.showModal({
      title: '提示',
      content: '请输入内容',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            areUok:""
          })
          var temData = that.data.wxSearchData;
          temData.view.isShow = false;
          that.setData({
            wxSearchData: temData
          });
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            areUok: ""
          })
          var temData = that.data.wxSearchData;
          temData.view.isShow = false;
          that.setData({
            wxSearchData: temData
          });
        }
      }
    })
  }
  else{  
  wx.request({
    url: 'https://api.mongoliaci.com/api/product/list/37fb591be38db52dd1d5f04b689008f6?name=' + text, //仅为示例，并非真实的接口地址
    data: {
      x: '',
      y: ''
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      var temData = that.data.wxSearchData;
      temData.view.isShowSearchKey = false;
      that.setData({
        wxSearchData: temData
      });
      // console.log((res.data.data.data).length)
      for (var i = 0; i < (res.data.data.data).length; i++) {
        inits.push(res.data.data.data[i]);
        // console.log(res.data.data.data);
        // console.log(res.data.data.data[i].name);
        // console.log(inits);
        initMindKeys(inits);
      }
      console.log((res.data.data.data))
      if ((res.data.data.data).length > 0) {
        for (var i = 0; i < __mindKeys.length; i++) {
          var mindKey = __mindKeys[i];
          // if (mindKey.indexOf(text) > -1) {
          mindKeys.push(mindKey);
          // }
        }
        
      } else {
        wx.showModal({
          title: '提示',
          content: '暂无数据',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                areUok: ""
              })
              var temData = that.data.wxSearchData;
              temData.view.isShow = false;
              that.setData({
                wxSearchData: temData
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                areUok: ""
              })
              var temData = that.data.wxSearchData;
              temData.view.isShow = false;
              that.setData({
                wxSearchData: temData
              });
            }
          }
        })
      }
      temData.value = text;
      temData.mindKeys = mindKeys;
      that.setData({
        wxSearchData: temData
      });

    }
  })
  }

  // if (typeof (text) == "undefined" || text.length == 0) {

  // } else {
  //   console.log(mindKeys)
  //   for (var i = 0; i < __mindKeys.length; i++) {
  //     var mindKey = __mindKeys[i];
  //     if (mindKey.indexOf(text) > -1) {
  //       mindKeys.push(mindKey);
  //     }
  //   }
  // }
  // temData.value = text;
  // temData.mindKeys = mindKeys;
  // that.setData({
  //   wxSearchData: temData
  // });
    // console.log(mindKeys)
    
}
function wxSearchDeleteKey(e,that) {
    var text = e.target.dataset.key;
    var value = wx.getStorageSync('wxSearchHisKeys');
    value.splice(value.indexOf(text),1);
    wx.setStorage({
        key:"wxSearchHisKeys",
        data:value,
        success: function(){
            getHisKeys(that);
        }
    })
}
function wxSearchDeleteAll(that){
    wx.removeStorage({
        key: 'wxSearchHisKeys',
        success: function(res) {
            var value = [];
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        } 
    })
}



module.exports = {
    init: init,
    initColor: initColors,
    initMindKeys: initMindKeys,
    wxSearchInput: wxSearchInput,
    wxSearchFocus: wxSearchFocus,
    wxSearchBlur: wxSearchBlur,
    wxSearchKeyTap: wxSearchKeyTap,
    wxSearchAddHisKey:wxSearchAddHisKey,
    wxSearchDeleteKey:wxSearchDeleteKey,
    wxSearchDeleteAll:wxSearchDeleteAll,
    wxSearchHiddenPancel:wxSearchHiddenPancel
}