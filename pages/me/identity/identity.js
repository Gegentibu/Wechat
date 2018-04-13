var interval = null //倒计时函数
Page({
  data: {
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    add_img: [],
    dates: [
             { "data_name": "30", "name": "代销大人", "state": 0 },
             { "data_name": "1", "name": "餐饮客户", "state": 0 },
             { "data_name": "2", "name": "企业客户", "state": 0 },
             { "data_name": "3", "name": "分享达人", "state": 0 },
             { "data_name": "4", "name": "生产服务", "state": 0 },
             { "data_name": "5", "name": "品牌厂商", "state": 0 },
             { "data_name": "6", "name": "冷链物流", "state": 0 }
     ]
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
  tagChoose: function (e) {
     var index = e.currentTarget.dataset.key;
     if (this.data.dates[index].state == 1) {
       this.data.dates[index].state = 0;
      
    } else if (this.data.dates[index].state == 0) {
       this.data.dates[index].state = 1;
      
    }
     this.setData({
             dates: this.data.dates,
           });
    
  },
  

})