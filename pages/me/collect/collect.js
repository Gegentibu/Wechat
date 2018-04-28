var sliderWidth = 78; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["产品", "厂商"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0
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
      success: function(res) {
        wx.request({
          url: 'https://api.mongoliaci.com/api/brand/collect/list/37fb591be38db52dd1d5f04b689008f6?uid='+res.data,
          success: function (res) {
            console.log(res.data)
            // that.setData({
            //   status: 1,
            //   // collect_id:res.data.BrandCollect.id
            // })
          } 
        })
        wx.request({
          url: 'https://api.mongoliaci.com/api/product/collect/list/37fb591be38db52dd1d5f04b689008f6?uid=' + res.data,
          success: function (res) {
            console.log(res.data)
            // that.setData({
            //   status: 1,
            //   // collect_id:res.data.BrandCollect.id
            // })
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