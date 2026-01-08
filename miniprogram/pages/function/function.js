// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    rectangle: {
      width: 22,
      height: 23,
    },
    source: '',
    openID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this;
    wx.cloud.callFunction({
      name: 'sum',    // 上面这个云函数并不需要传递参数（也就不需要data属性）
    }).then(res => {
      console.log("云函数返回的结果", res);
      that.setData({
        result: res.result,
      });
    }).catch(err => {
      console.log("云函数", err);
    })
    // this.getData();
    wx.cloud.callFunction({name: "invoke"}).then(res => {
      console.log("invoke返回结果", res)
      this.setData({
        source: res.result.wxContext.SOURCE,
        openID: res.result.wxContext.OPENID,
      })
    })
  },
  // async getData(){
  //   const result_print = await wx.cloud.callFunction({
  //     name: "invoke",
  //     data: {
  //       rectangle: this.data.rectangle
  //     }
  //   })

  //   console.log("result_print对象", result_print)
  //   const {result: {circum, area}} = result_print
  //   console.log({circum, area})
  //   this.setData({circum, area})
  //   console.log(this.data.circum)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})