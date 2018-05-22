var sliderWidth = 78; 
Page({
  data: {
    tabs: ["产品介绍", "销售店铺", "产品参数"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    product: [],
    store:[],
    status: "",
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function (options) {
    console.log(options)
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
          url: 'https://api.mongoliaci.com/api/product/detail/37fb591be38db52dd1d5f04b689008f6?brand_id=' + options.brandId + '&product_id=' + options.id +'&uid='+res.data, 
          header: {
            'content-type': 'application/json' 
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              product: res.data.product[0],
              store: res.data.Store[0],
              status:res.data.status.status
            })
          }
        })
      },
    })


  },  
  toBrand:function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../brand/brand?id=' + e.currentTarget.dataset.id,
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
  },
    Collect: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    console.log(that.data.status)
    if (that.data.status == 0) {
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          console.log(id)
          wx.request({
            url: 'https://api.mongoliaci.com/api/product/collect/37fb591be38db52dd1d5f04b689008f6', 
            data: {
              uid: res.data,
              product_id: id,
              status: 1
            },
            header: {
              'content-type': 'application/json' 
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                status: 1,
                // collect_id:res.data.BrandCollect.id
              })
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          console.log(res.data)
          // console.log(that.data.Collect_id)
          wx.request({
            url: 'https://api.mongoliaci.com/api/product/collect/cancel/37fb591be38db52dd1d5f04b689008f6', 
            data: {
              uid: res.data,

              product_id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              // if(res.data.data == true){
              that.setData({
                status: 0
              })
              // }
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  }  
});