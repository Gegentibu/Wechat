var interval = null //倒计时函数
Page({
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    add_img: [],
    img: []
  },
  gotoShow: function () {
    console.log("添加图片")
    var that = this;
    wx.chooseImage({
      count:1,
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
            url: 'https://api.mongoliaci.com/api/business/licensee/37fb591be38db52dd1d5f04b689008f6', //开发者服务器 url
            filePath: filePath[i],//要上传文件资源的路径
            name: 'file[]',

            formData: { //HTTP 请求中其他额外的 form data
              'user': 'test'
            },
            success: function (res) {
              // var data = res.data
              console.log(res)
              var data = JSON.parse(res.data);
              //do something
              // console.log(res.data)
              that.data.img.push(data.name)
            }
          })
        }
      },
    })
  },
  submit: function (e) {
    var that = this;
    var a = "{'image':'" + that.data.img + "'}";
    console.log(a)
    // var image = {};
    // image.push("")
    console.log(that.data.img[0])
      wx.getStorage({
        key: 'openid',
        success: function(res) {
          wx.request({
            url: 'https://api.mongoliaci.com/api/completion/certification/37fb591be38db52dd1d5f04b689008f6', //仅为示例，并非真实的接口地址
            data: {
              filepath: that.data.img[0],
              uid: res.data
            },
            // method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data)
            }
          })

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
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },

})