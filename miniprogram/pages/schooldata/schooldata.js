// pages/schooldata/schooldata.js
const db = wx.cloud.database()    // 获取数据库的引用
const _ = db.command    // 获取数据库查询及更新操作符
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection("school")   // 获取集合school的引用
      .where(
        // _.or([{dorm: _.gt(462)}, {gender: "女"}])   // 跨字段或逻辑的标准写法
        {
          name: /李/i,
          gender: "女",
        }
      )
      .field({    // 显示哪些字段
        _id: false,    // 默认显示_id，false表示隐藏
        name: true,
        class_and_grade: true,
        gender: true,
        bed: true,
      })
      .orderBy('bed', 'desc')   // desc表示排序方式为降序排列（asc为升序（默认））
      .skip(0)    // 跳过多少个记录（常用于分页），0表示不跳过
      .limit(10)    // 限制显示多少条记录，这里为10
      .get()    // 获取根据查询条件筛选后的集合数据
      // .count()    // 统计记录
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
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

  operateStudents(){
    wx.cloud.callFunction({
      name: "add_student",
    })
    .then(res => {
      console.log("操作多条数据成功", res)
    })
    .catch(console.error)
  },
})