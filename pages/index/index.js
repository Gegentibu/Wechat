var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: [
      { url: '../image/timg.jpeg' },
      { url: '../image/timg.jpeg' },
      { url: '../image/timg.jpeg' }
    ],
    what:'',
    toView: 'red',
    scrollTop: 100,
    brand:[],
    article:[],
    areUok:""

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/index/index',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  logistics:function(){
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },
  offer: function () {
    wx.navigateTo({
      url: '../offer/offer',
    })
  },
  finance: function () {
    wx.navigateTo({
      url: '../finance/finance',
    })
  },
  Supermarket: function () {
    wx.navigateTo({
      url: '../Supermarket/Supermarket',
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'https://api.mongoliaci.com/api/brand/index/37fb591be38db52dd1d5f04b689008f6', 
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          brand:res.data.data
        })
      }
    })
    wx.request({
      url: 'https://api.mongoliaci.com/api/article/index/37fb591be38db52dd1d5f04b689008f6', 
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
           article: res.data.data
        })
      }
    })


    WxSearch.init(that, 43, [{ id: "1", name: "羊白条" }, { id: "67", name: "整块鲜牛肉" }, { id: "243", name: "马肉" }, { id: "253", name: "腱子" }, { id: "97", name: "羊肉卷" }],

    );
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
     
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {

      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    that.setData({
      areUok:"none"
    })

  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);

  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that,);

    that.setData({
      areUok: "none"
    })
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);

    that.setData({
      areUok: ""
    })
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);

    that.setData({
      areUok: ""
    })
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toBrand:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../brand/brand?id='+id,
    })
  }
})
