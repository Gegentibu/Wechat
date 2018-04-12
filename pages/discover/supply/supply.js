// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_img: [],
    textarea: '',
    input:'',
    img:[]
  },
  bindInputBlur:function (e){
    this.setData({
      input: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  gotoShow: function () {
    console.log("添加图片")
    var that = this;
    wx.chooseImage({
      success: function (res) {
        // console.log(res)
        var src = res.tempFilePaths;
        var aa = that.data.add_img.concat(src)
        // console.log(aa)
        that.setData({
          add_img: aa
        })
        var filePath = that.data.add_img;
        console.log(filePath)
        for (var i = 0, h = filePath.length; i < h; i++) {
          wx.uploadFile({
            url: 'https://api.mongoliaci.com/api/wechat/image', //开发者服务器 url
            filePath: filePath[i],//要上传文件资源的路径
            name: 'file[]', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
            formData: { //HTTP 请求中其他额外的 form data
              'user': 'test'
            },
            success: function (res) {
              // var data = res.data
              var data = JSON.parse(res.data);
              //do something
              console.log(data.name[0])
              that.data.img.push(data.name[0])
            }
          })
        }
      },
    })
  },
  delete_th: function (e) {
    var num = e.currentTarget.dataset.num;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.data.add_img.splice(num, 1)
          that.setData({
            add_img: that.data.add_img
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  preview_img: function (e) {
    var cur_num = e.currentTarget.dataset.num;
    var img_list = this.data.add_img
    wx.previewImage({
      current: img_list[cur_num],
      urls: this.data.add_img
    })
  },
  uploadImg:function(e){
 
      var that = this;
      wx.request({
        url: 'https://api.mongoliaci.com/api/wechat/image', //仅为示例，并非真实的接口地址
        data: {
          content: that.data.textarea,
          num: that.data.input,
          image: that.data.img
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})