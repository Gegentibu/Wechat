
var sliderWidth = 78; 
Page({
  data: {
    tabs: ["行业资讯", "行业资讯", "行业资讯", "行业资讯"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/informationList/informationList',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
        });
      }
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: 'https://api.mongoliaci.com/api/brand/collect/list/37fb591be38db52dd1d5f04b689008f6?uid=' + res.data,
          success: function (res) {
            console.log(res.data)

          }
        })
        wx.request({
          url: 'https://api.mongoliaci.com/api/product/collect/list/37fb591be38db52dd1d5f04b689008f6?uid=' + res.data,
          success: function (res) {
            console.log(res.data)

          }
        })
      },

    })
    // console.log('onLoad')
    // console.log(options.goo)


  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});