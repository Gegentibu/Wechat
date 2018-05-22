 Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    name:'加载中',
    nameDisplay:'',
    reviseImg: "../image/编辑.svg",
    verification:"验证身份",
    certification:"",
    toIdentity:"toIdentity"
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/me/me',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  revise: function(){
    var name = this.data.name;
    this.setData({
      nameDisplay:1
    })
  },
  bindKeyInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  define:function() {
    var name = this.data.name;
    if (name==''){
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        showCancel:false
        
      })
    }else{
      this.setData({
        nameDisplay: 0
      })
    }
  },
    toNews:function(){
    wx.navigateTo({
      url: '../news/news',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  toPublish: function () {
    wx.navigateTo({
      url: '../publish/publish',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  toSupplement: function () {
    wx.navigateTo({
      url: 'supplement/supplement',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  toIdentity: function () {
    wx.navigateTo({
      url: 'identity/identity',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  toCollect: function () {
    wx.navigateTo({
      url: 'collect/collect',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  toHelp: function () {
    wx.navigateTo({
      url: 'help/help',
      success: function () { },
      fail: function () { },
      complete: function () { }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if (options.name!==undefined){
      this.setData({
        name: options.name
      })
    }
    wx.getUserInfo({
      success: function (res) {
      that.setData({
        name: res.userInfo.nickName,
        reviseImg: res.userInfo.avatarUrl
      })
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res.data)
        wx.request({
          url: 'https://api.mongoliaci.com/api/my/certification/business_license/message/37fb591be38db52dd1d5f04b689008f6?uid='+res.data,
          success:function(res) {
            console.log(res.data.data.certification)
            that.setData({
              certification: res.data.data.certification
            })
            if (res.data.data.certification == 1){
              that.setData({
                verification: "已验证",
                toIdentity:"-"
              })
            }
          }
        })
      },
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

  }
})