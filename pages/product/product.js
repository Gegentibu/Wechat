var sliderWidth = 78; // 需要设置slider的宽度，用于计算中间位置
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
          url: 'https://api.mongoliaci.com/api/product/detail/37fb591be38db52dd1d5f04b689008f6?brand_id=' + options.brandId + '&product_id=' + options.id +'&uid='+res.data, //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
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
            url: 'https://api.mongoliaci.com/api/product/collect/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址
            data: {
              uid: res.data,
              product_id: id,
              status: 1
            },
            header: {
              'content-type': 'application/json' // 默认值
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
            url: 'https://api.mongoliaci.com/api/product/collect/cancel/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址
            data: {
              uid: res.data,
              // collect_id: that.data.Collect_id
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