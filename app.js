//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
   
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //       console.log(this.globalData.userInfo)
    //     }
    //   }
    // })
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res.code)
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://api.mongoliaci.com/api/wechat/key/',
                // method:'POST',
                data: {
                  code: res.code
                }, success(res) {
                  console.log(res.data)
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  })
                  wx.getStorage({
                    key: 'openid',
                    success: function (res) {
                      console.log(avatarUrl)
                      wx.request({
                        url: 'https://api.mongoliaci.com/api/wechat/info/', //仅为示例，并非真实的接口地址
                        data: {
                          userInfo: userInfo,
                          nickName: nickName,
                          avatarUrl: avatarUrl,
                          gender: gender,
                          province: province,
                          city: city,
                          country: country,
                          openid: res.data
                        },
                        header: {
                          'content-type': 'application/json' // 默认值
                        },
                        success: function (res) {
                          console.log(res.data.uid)
                          // console.log(res.data.uid)
                          // wx.setStorage({
                          //   key: "uid",
                          //   data: res.data.openid
                          // })
                        }
                      })
                    }
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
    
  },
  globalData: {
    userInfo: null
  },
  
  
})

