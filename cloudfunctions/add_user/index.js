// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const bk = await db.collection('books').get()

  db.collection('user').add({
    data: [
      {
        _id: "user001",
        books: bk.data.slice(0, 3)
      },
      {
        _id: "user002",
        books: bk.data.slice(1, 4)
      },
    ]
  })
}