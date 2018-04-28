var interval = null //倒计时函数
Page({
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    add_img: [],
    dates: [
      { "data_name": "0", "name": "代销达人", "state": 0, "sort": "agent" },
      { "data_name": "1", "name": "餐饮客户", "state": 0, "sort": "Catering_customer" },
      { "data_name": "2", "name": "企业客户", "state": 0, "sort": "Corporate_client" },
      { "data_name": "3", "name": "分享达人", "state": 0, "sort": "Share_talent" },
      { "data_name": "4", "name": "生产服务", "state": 0, "sort": "Production_service" },
      { "data_name": "5", "name": "品牌厂商", "state": 0, "sort": "Brand" },
      { "data_name": "6", "name": "冷链物流", "state": 0, "sort": "Cold_chain_logistic" }
     ],
    phoneNub:"",
    codeNub:""
  },
  // tagChoose: function (e) {
  //   var that = this
  //   var id = e.currentTarget.dataset.id;
  //   console.log(id)
  //   //设置当前样式
  //   that.setData({
  //     'current': id
  //   })
  // },
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
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  getPhoneNub:function(e){
    // console.log(e.detail.value)
    var that = this;
    that.setData({
      phoneNub:e.detail.value
    })
  },
  getCodeNub: function (e) {
    // console.log(e.detail.value)
    var that = this;
    that.setData({
      codeNub: e.detail.value
    })
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log(res.data)
        console.log(that.data.phoneNub)
        wx.request({
          url: 'https://api.mongoliaci.com/api/send/mobile/code/37fb591be38db52dd1d5f04b689008f6',
          data: {
            uid:res.data,
            mobile:that.data.phoneNub
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      },
    })
    
  },
  tagChoose: function (e) {
     var index = e.currentTarget.dataset.key;
     if (this.data.dates[index].state == 1) {
       this.data.dates[index].state = 0;
      
    } else if (this.data.dates[index].state == 0) {
       this.data.dates[index].state = 1;
      
    }
    //  console.log(this.data.dates)
     this.setData({
             dates: this.data.dates,
           });
    
  },
  submit:function(){
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(that.data.phoneNub)
        console.log(that.data.codeNub)
        console.log(that.data.dates[0].state)
        console.log(that.data.dates[1].state)
        wx.request({
          url: 'https://api.mongoliaci.com/api/mobile/verify/code/37fb591be38db52dd1d5f04b689008f6',
          data: {
            uid: res.data,
            mobile: that.data.phoneNub,
            code: that.data.codeNub,
            agent: that.data.dates[0].state,
            Catering_customer: that.data.dates[1].state,
            Corporate_client: that.data.dates[2].state,
            Share_talent: that.data.dates[3].state,
            Production_service: that.data.dates[4].state,
            Brand: that.data.dates[5].state,
            Cold_chain_logistic: that.data.dates[6].state
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if(res.data.data == true){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })},2000)              
            }else{
              wx.showModal({
                title: '提示',
                content: '手机号或验证码错误',
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
      },
    })
  }

})