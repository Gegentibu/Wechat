
var indexArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var y = 0;

function getArrIndex(english){

  for(var x = 0;x<indexArr.length;x++){
    if(english == indexArr[x]){
      return x;
    }
  }
}

function getArrEnglish(num,index){
  var english = indexArr[index + num];
  if(!(1>num+index>26)){
    return english; 
  }else{
    return AAA; 
  }
}
Page({
  data:{
    rightShow:false,
    dropShow:false,
    indexShow:false,
    toView:"e",
    scrollTop:1000,
    indexId:"",
    indexy:"",
    indexEnglish:"",
    arrId:indexArr,
    userInfo:"这个数据要细分",
    className:"",
    whether:"none",
    pron:"none",
    sort:[],
    dates: [
      { "data_name": "0", "name": "羊肉", "state": 0, "sort": "sheep" },
      { "data_name": "1", "name": "牛肉", "state": 0, "sort": "cow" },
      { "data_name": "2", "name": "驼肉", "state": 0, "sort": "camel" },
      { "data_name": "3", "name": "猪肉", "state": 0, "sort": "pig" },
      { "data_name": "4", "name": "鸡肉", "state": 0, "sort": "chicken" },
      { "data_name": "5", "name": "鸭肉", "state": 0, "sort": "duck" },
      { "data_name": "6", "name": "鹅肉", "state": 0, "sort": "goose" },
      { "data_name": "7", "name": "鱼肉", "state": 0, "sort": "fish" },
      { "data_name": "8", "name": "驴肉", "state": 0, "sort": "donkey" },
      { "data_name": "9", "name": "马肉", "state": 0, "sort": "horse" }
    ],
    kind:'',
    level:''
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '肉行业的OMO共享平台',
      path: 'pages/search/search',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  category: function (e) {
    var _key = '';
    this.data.whether == "none" ? _key = '-' : _key = "none" ;
    this.setData({
      whether: _key,
      pron: "none"
    })
  },
  attestation: function (e) {
    var _key = '';
    this.data.pron == "none" ? _key = '-' : _key = "none";
    this.setData({
      pron: _key,
      whether: "none",
    })
  },
  tagChoose: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    console.log(id)
    //设置当前样式
    that.setData({
      'current': id
    })
    setTimeout(function () {
      that.setData({
        whether: "none"
      })},500)
    
  },
  resetting:function(){
    // console.log(0)
    var that = this;
    that.setData({
      'current': "-",
      'currentItem': "-",
      whether: "none",
      pron: "none",
      level:"",
      kind:""
    })
    wx.request({
      url: 'https://api.mongoliaci.com/api/brand/list/37fb591be38db52dd1d5f04b689008f6', 
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          sort: res.data.sort
        });
      }
    })
  },
  Choose: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    console.log(id+1)
    //设置当前样式
    that.setData({
      'currentItem': id,
      level:id+1
    })
    setTimeout(function () {
      that.setData({
        pron: "none"
      })
      wx.request({
        url: 'https://api.mongoliaci.com/api/brand/list/37fb591be38db52dd1d5f04b689008f6?' + that.data.kind + '=1&level' + that.data.level + '=' + that.data.level, 
        header: {
          'content-type': 'application/json' 
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            sort: res.data.sort
          });
          if(res.data.sort == null ){
            wx.showModal({
              title: '提示',
              content: '暂无数据',
              showCancel: false              
            })
            that.resetting();
          }
        }
      })
    }, 500)
    

  },
  touchstart:function(e){
    this.setData({
      indexId:e.target.id,
      toView:e.target.id.toLowerCase(),
      indexy:e.touches[0].pageY,
      indexShow:true,
      indexEnglish:e.target.id
    })
  },
  touchmove:function(e){
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if(getArrEnglish(Math.round((indexY-this.data.indexy)/15),y)){
      this.setData({
        toView:getArrEnglish(Math.round((indexY-this.data.indexy)/15),y).toLowerCase(),
        indexEnglish:getArrEnglish(Math.round((indexY-this.data.indexy)/15),y)
      })
    }
  },
  touchend:function(e){
    this.setData({
      indexShow:false
    })
  },
  tagChoose: function (e) {
    var that = this
    var id = e.target.dataset.key;
    console.log(e.target.dataset)
    //设置当前样式
    that.setData({
      'current': id,
      // species: id + 2,
      kind: e.target.dataset.sort

    })
    setTimeout(function () {
      that.setData({
        whether: "none"
      })
    }, 500)
    wx.request({
      url: 'https://api.mongoliaci.com/api/brand/list/37fb591be38db52dd1d5f04b689008f6?' + that.data.kind + '=1&level' + that.data.level + '=' + that.data.level,  
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          sort: res.data.sort
        });
        if (res.data.sort == null) {
          wx.showModal({
            title: '提示',
            content: '暂无数据',
            showCancel: false
          })
          that.resetting();
        }
      }
    })


  },
  onLoad:function(options){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop:res.windowHeight/2 - 280
        });
      }
    })
    wx.request({
      url: 'https://api.mongoliaci.com/api/brand/list/37fb591be38db52dd1d5f04b689008f6', 
      data: {

      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        console.log(res.data.sort)
        that.setData({
          sort: res.data.sort
        });
      }
    })
  },
  showRequire:function(e){
    console.log(e.target.dataset.id)
    var id = e.target.dataset.id;
      wx.navigateTo({
        url: '../brand/brand?id=' + id,
      })    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})