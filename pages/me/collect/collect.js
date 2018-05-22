var sliderWidth = 78; 
Page({
  data: {
    tabs: ["产品", "厂商"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    BrandList:[],
    ProductList: []

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/me/me',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },
  toProduct:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../product/product?id=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toBrand:function(e) {
    console.log(e.currentTarget.dataset.id)
     wx.navigateTo({
      url: '../../brand/brand?id=' + e.currentTarget.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
            that.setData({
              BrandList: res.data.CollectList
            })
          } 
        })
        wx.request({
          url: 'https://api.mongoliaci.com/api/product/collect/list/37fb591be38db52dd1d5f04b689008f6?uid=' + res.data,
          success: function (res) {
            console.log(res.data)
            that.setData({
              ProductList: res.data.CollectList
            })
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