// pages/nowqueue/nowqueue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    km:"",
    markers: [{
      iconPath: "../../images/Bank.png",
      id: 0,
      latitude: 42.03,
      longitude: 119.28,
      width: 16,
      height: 16
    }],
  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));

    return distance;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '排队页面' 
    })
    wx.getLocation({
      success: res => {
        console.log(res);
        this.setData({
          latitudes: res.latitude,
          longitudes: res.longitude,
          polyline: [{
            points: [
              {
                longitude: res.longitude,  // 起始点经度
                latitude: res.latitude     // 起始点纬度
              }, {
                longitude: 119.28,  //目标地点经度
                latitude: 42.03     //目标地点纬度
                // 可搜索网站 在线经纬度查询：http://www.gpsspg.com/maps.htm
                // 在此网站输入自己的目标地址即可得到此地址的经度和纬度
              }
            ],
            color: "#000000AA",  //线的颜色
            width: 2,            //线的宽度
            dottedLine: true     //是否为虚线
          }],
        })

        console.log(this.data.latitudes)
        var str=this.getDistance(this.data.longitudes,this.data.latitudes,42.03,119.28)
        console.log((str / 1000).toFixed(2))
        this.setData({
          km: (str / 1000).toFixed(2)
        })
        // console.log(app.globalData.location);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
        }
        else {
          //调用wx.getLocation的API
        }
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
    console.log(this.data.markers[e.markerId])
    this.setData({
      latitudes: this.data.markers[e.markerId].latitude,
      longitudes: this.data.markers[e.markerId].longitude,
      polyline:''
    })

  },
  controltap(e) {
    console.log(e.controlId)
  },
  handleCancel(e){
    wx.navigateTo({
      url: '../cancels/cancels',
    })
    console.log("取消排队")
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