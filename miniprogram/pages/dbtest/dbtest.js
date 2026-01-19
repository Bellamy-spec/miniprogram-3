// pages/dbtest/dbtest.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhihu_data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const db = wx.cloud.database()    // 声明一个变量，简化后面的写法
    // db.collection('zhihu_daily')
    //   .get()
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },

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

  },

  getDaily(){
    wx.cloud.callFunction({
      name: 'zhihu_daily',
      success: res => {
        let zhihu_data = res.result.data.slice(4, 9)
        console.log("云函数返回的数据", zhihu_data)
        this.setData({
          zhihu_data: zhihu_data
        })
      },
      fail: err => {
        console.log('云函数调用失败：', err)
      }
    })
  },

  async getData(){
    // 注意，因为数据在get请求对象的data里，所以写法如下
    const daily_1 = (await db.collection('zhihu_daily').where({image: _.exists(true)}).get()).data
    // 也可以分两次写，注意await是在async()函数里
    const result = await db.collection('zhihu_daily').where({image: _.exists(false)}).get()
    const daily_2 = result.data
    console.log("第一次获取", daily_1)
    console.log("第二次获取", daily_2)
    this.setData({
      zhihu_data: daily_1
    })
  },

  addDaily(){
    db.collection('zhihu_daily').add({
      data: {
        _id: "daily20260119",
        title: "令人心驰神往的呼伦贝尔大草原",
        image: "cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/微信图片_20251218214141.jpg",
        id: "20260119",
        type: 0,
        hint: "苏格拉底的麦穗",
        url: "",
      },
    })
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
  },
})