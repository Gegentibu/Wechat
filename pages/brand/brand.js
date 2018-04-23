// pages/brand/brand.js
var sliderWidth = 78; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()

Page({
  data: {
    tabs: ["品牌介绍", "销售店铺", "产品列表"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: [],
    brand:[],
    product:[],
    store:[]

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
        });
      }
    });
    wx.request({
      url: 'https://api.mongoliaci.com/api/brand/detail/37fb591be38db52dd1d5f04b689008f6?id='+options.id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          brand:res.data.brand[0],
          product: res.data.product,
          store: res.data.store,
          movies: [
            { url: 'https://api.mongoliaci.com/' + res.data.brand[0].atlas1 },
            { url: 'https://api.mongoliaci.com/' + res.data.brand[0].atlas2 },
            { url: 'https://api.mongoliaci.com/' + res.data.brand[0].atlas3}
          ]
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  toProduct: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
  },
  makePhone:function(e){
    console.log(e.currentTarget.dataset.phone)
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone 
    })
  },
  Collect:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'https://api.mongoliaci.com/api/brand/collect/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址
          data: {
            uid: res.data,
            brand_id: id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }  
})