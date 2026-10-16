// pages/schooldata/schooldata.js
const db = wx.cloud.database()    // 获取数据库的引用
const _ = db.command    // 获取数据库查询及更新操作符
const $ = db.aggregate    // 聚合查询操作符
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
      data: {
        action: 'addMany',
      },
    })
    .then(res => {
      console.log("操作多条数据成功", res)
    })
    .catch(console.error)
  },

  updateStudents(){
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: 'updateMany',
      },
    })
    .then(res => {
      console.log("更新指定记录成功", res)
    })
    .catch(console.error)
  },

  incBed(){
    wx.cloud.callFunction({
      name: "add_student",
      data: {
        action: 'incMany',
      },
    })
    .then(res => {
      console.log("李姓女生床铺号加10成功", res)
    })
    .catch(err => {
      console.log(err)
    })
  },

  getLi(){
    // 变量方式获取
    const studentname = "李"
    db.collection('school').where({
      name: db.RegExp({
        regexp: `${studentname}`,
        options: 'i',
      })
    })
    .get()
    .then(res => {
      console.log("获取成功", res)
    })
    .catch(console.error)
  },

  normalConsult(){
    // 普通查询
    db.collection('school')   // 获取集合school的引用
      .where({                // 查询的条件操作符where()
        dorm: _.lt(420)       // 查询筛选条件，lt表示字段需小于指定值
      })
      .field({                // 显示哪些字段
        _id: false,           // 默认显示_id，false表示隐藏
        name: true,
        dorm: true,
        bed: true,
      })
      .orderBy('dorm', 'asc')   // 排序方式为升序排列
      .skip(0)                  // 跳过多少个记录（常用于分页），0表示不跳过
      .limit(10)                // 限制显示多少个记录，这里为10，默认是20
      .get()                    // 获取根据查询条件筛选后的集合数据
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },

  aggregateConsult(){
    // 聚合查询
    db.collection('school').aggregate()   // 发起聚合操作
      .match({                  // 类似于where()，对记录进行筛选
        dorm: _.lt(420)
      })
      .project({                // 类似于field()，在这里可以新增字段
        _id: false,             // 默认显示_id，false表示隐藏
        name: true,
        dorm: true,
        bed: true,
      })
      .sort({                   // 类似于普通查询的orderBy()
        dorm: 1,
      })
      .skip(5)                  // 类似于普通查询的skip()
      .limit(1000)              // 类似于普通查询的limit()，默认是20，没有上限
      .end()                    // 注意，end()标志聚合操作的完成
      .then(res => console.log(res.list))   // 与普通查询的res.data不同
      .catch(err => console.error(err))
  },
})