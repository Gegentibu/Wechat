// pages/discover/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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


})