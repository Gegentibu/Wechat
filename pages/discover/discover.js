// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:"none",
    change:"+",
    Commentary:"none",
    data:[],
    textarea:"",
    key:''

  },
  bindTextAreaBlur: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  answer:function(e){
    // console.log(e.currentTarget.dataset.key)
    this.setData({
      Commentary:"block",
      key:e.currentTarget.dataset.key
    })
  },
  close: function () {
    this.setData({
      Commentary: "none"
    })
  },
  bindChage:function(){
    if(this.data.display == "none"){
      this.setData({
        display: "block",
        change: "x"
      })
    }else{
      this.setData({
        display: "none",
        change: "+"
      })
    }

  },
  answerBtn:function(){
    var that= this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'https://api.mongoliaci.com/api/discover/reply/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址
          data: {
            uid: res.data,
            d_id: that.data.key,
            content: that.data.textarea
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.data)
            // that.setData({
            //   data: res.data
            // })
          }
        })
      }
    })
    console.log(that.data.textarea)
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.mongoliaci.com/api/discover/index/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          data:res.data
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})