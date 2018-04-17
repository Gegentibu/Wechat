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