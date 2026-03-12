// pages/dbtest/dbtest.js
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhihu_data: {},
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

    // 基于Document的请求的写法
    db.collection('zhihu_daily').doc("daily20260119")
      .get()
      .then(res => {
        console.log('单个记录的值', res.data)
      })
      .catch(err => {
        console.log(err)
      })

    // 基于Collection请求的写法，在where()中指定_id的值即可只查询一条记录，再对记录进行操作
    // wx.cloud.callFunction({   // 通过云函数获取用户的openid是有必要的
    //   name: "invoke",
    // }).then(res => {
    //   // 后续所有操作都只能放在云函数的回调当中
    //   const user_openid = res.result.wxContext.OPENID
    //   console.log("获取到的openid", user_openid)
    //   db.collection('zhihu_daily').where({
    //     _openid: user_openid,
    //     _id: "daily20260119",
    //   })
    //     .get()
    //     .then(res => {
    //       console.log('基于collection查询的值', res.data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }).catch(err => {
    //   console.log(err)
    // })

    // this.chooseUser()
    // this.selectScore()
    this.callBook()
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

  removeDaily(){
    db.collection('zhihu_daily').doc("daily20260119")
      .remove()
      .then(console.log)
      .catch(console.error)
  },

  updateDaily(){
    db.collection('zhihu_daily').doc("daily20260119")
      .update({
        data: {
          title: "呼伦贝尔大草原————也就一般向往",
        }
      })
  },

  updateBytemp(){
    const colName = "zhihu_daily"
    const id = "daily20260119"
    const data = {
      title: "呼伦贝尔大草原————也就一般向往",
      image: "cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/微信图片_20251218214143.jpg",
    }

    db.collection(colName).where({
      _id: id
    })
    .update({
      data: data
    })
  },

  setDaily(){
    db.collection('zhihu_daily').doc("daily20260119")
      .set({
        data: {
          title: "阿尔山————神奇的火山遗迹",
          image: "cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/微信图片_20251218214148.jpg",
          id: 20260119,
          type: 0,
          hint: "苏格拉底的麦穗",
        }
      })
  },

  chooseUser(){
    // 按指定条件筛选用户
    db.collection('user').where({
      tags: _.elemMatch(_.eq("视频")),    // 筛选
    })
    .get()
    .then(res => {
      console.log("用户筛选结果", res)
    })
    .catch(console.error)
  },

  selectScore(){
    // 按分数筛选
    db.collection('user').where({
      scores: _.elemMatch(_.gte(95))
    })
    .get()
    .then(res => {
      console.log("用户筛选结果", res)
    })
    .catch(console.error)
  },

  updateUser(){
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: "updateUser",
      },
    })
    .then(res => {
      console.log("用户信息更新成功", res)
    })
    .catch(console.error)
  },

  callBook(){
    // 按条件查询书籍信息
    db.collection('user').where({
      "tags.2": "漫画",
    })
    .get()
    .then(res => {
      console.log("书籍查询结果", res)
    })
    .catch(console.error)
  },

  updateBooks(){
    // 更新书籍信息
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: "updateBooks",
      },
    })
    .then(res => {
      console.log("书籍信息更新成功", res)
    })
    .catch(console.error)
  },

  updateUserBytemp(){
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: "updateUserBytemp",
      },
    })
    .then(res => {
      console.log("用户信息以变量方式更新成功", res)
    })
    .catch(console.error)
  },

  updateBooksBytemp(){
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: "updateBooksBytemp",
      },
    })
    .then(res => {
      console.log("书籍信息以变量方式更新成功", res)
    })
    .catch(console.error)
  },
})