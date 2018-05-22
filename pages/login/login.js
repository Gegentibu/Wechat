Page({
 data: {
         dates: [
           { "data_name": "30", "name": "十三", "state": 0 },
           { "data_name": "1", "name": "十四", "state": 0 },
           { "data_name": "2", "name": "十五", "state": 0 },
           { "data_name": "3", "name": "十六", "state": 0 },
           { "data_name": "4", "name": "十七", "state": 0 },
           { "data_name": "5", "name": "十八", "state": 0 },
           { "data_name": "6", "name": "十九", "state": 0 },
           { "data_name": "7", "name": "二十", "state": 0 },
           { "data_name": "8", "name": "廿一", "state": 0 },
           { "data_name": "9", "name": "廿二", "state": 0 },
           { "data_name": "10", "name": "廿三", "state": 0 },
           { "data_name": "11", "name": "廿四", "state": 0 },
           { "data_name": "12", "name": "廿五", "state": 0 },
           { "data_name": "13", "name": "廿六", "state": 0 },
           { "data_name": "14", "name": "廿七", "state": 0 }
     ]
       },
 onShareAppMessage: function (res) {
   if (res.from === 'button') {
     // 来自页面内转发按钮
     console.log(res.target)
   }
   return {
     title: '肉行业的OMO共享平台',
     path: 'pages/login/login',
     success: function (res) {
       // 转发成功
     },
     fail: function (res) {
       // 转发失败
     }
   }
 },
  select_date: function (e) {
 var index = e.currentTarget.dataset.key;
 console.log(index)
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