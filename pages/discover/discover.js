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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/discover/discover',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },
  onPullDownRefresh: function () {

    wx.showNavigationBarLoading()
    console.log(1)
    var that = this;
    wx.request({
      url: 'https://api.mongoliaci.com/api/discover/index/37fb591be38db52dd1d5f04b689008f6', 

      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          data: res.data
        })
      }
    })
    setTimeout(function () {
     
      // complete
      wx.hideNavigationBarLoading() 
      wx.stopPullDownRefresh() 
    }, 1500);
    
  },
  
  bindTextAreaBlur: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  answer:function(e){
    console.log(e.target.dataset.phone)

    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone 
    })
  },
  bindChage:function(){
    if(this.data.display == "none"){
      this.setData({
        display: "block",
        change: "×"
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
          url: 'https://api.mongoliaci.com/api/discover/reply/37fb591be38db52dd1d5f04b689008f6', 
          data: {
            uid: res.data,
            d_id: that.data.key,
            content: that.data.textarea
          },
          header: {
            'content-type': 'application/json' 
          },
          success: function (res) {
            console.log(res.data.data)

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
      url: 'https://api.mongoliaci.com/api/discover/index/37fb591be38db52dd1d5f04b689008f6', 

      header: {
        'content-type': 'application/json' 
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
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})