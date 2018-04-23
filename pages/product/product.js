var sliderWidth = 78; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["产品介绍", "销售店铺", "产品参数"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    product: [],
    store:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
        });
      }
    });
    wx.request({
      url: 'https://api.mongoliaci.com/api/product/detail/37fb591be38db52dd1d5f04b689008f6?id=' + options.id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.Store[0])
        that.setData({
          product: res.data.product[0],
          store: res.data.Store[0]
        })
      }
    })


  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  makePhone: function (e) {
    console.log(e.currentTarget.dataset.phone)
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
});