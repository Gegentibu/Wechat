// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_img: [],
    textarea: '',
    input:'',
    img:"",
    uid:""
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
  Toterms:function(){
    wx:wx.navigateTo({
      url: '../../terms/terms',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
        for (let i = 0, h = filePath.length; i < h; i++) {
          wx.uploadFile({
            url: 'https://api.mongoliaci.com/api/wechat/image/37fb591be38db52dd1d5f04b689008f6', 
            filePath: filePath[i],
            name: 'file[]',   
                    
            formData: { 
              'user': 'test'
            },
            success: function (res) {
              // var data = res.data
              console.log(res)
              console.log(res.data)
              // var data = JSON.parse(res.data);
              //do something
              
              console.log(i)
              // that.data.img.push(data.name[0])
              if (that.data.img == ""){
                console.log(i)
                that.setData({
                  img: res.data
                })
              }else{
                that.setData({
                  img: that.data.img + ',' + res.data
                })
              }
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
    var img_list = this.data.add_img;
    wx.previewImage({
      current: img_list[cur_num],
      urls: this.data.add_img
    })
  },
  uploadImg:function(e){
    var that = this;

      console.log(that.data.img)
      if (that.data.input !== undefined && that.data.textarea !== undefined && that.data.input !== "" && that.data.textarea !== ""){
        wx.request({
          url: 'https://api.mongoliaci.com/api/create/discover/37fb591be38db52dd1d5f04b689008f6', 
          data: {
            content: that.data.textarea,
            num: that.data.input,
            image: that.data.img,
            uid: that.data.uid,
            category: '1',
          },

          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.data == true) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            } else {
              wx.showModal({
                title: '网络错误',
                content: '请稍后再试',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }

          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请输入内容，联系方式。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          uid: res.data
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

  }

})