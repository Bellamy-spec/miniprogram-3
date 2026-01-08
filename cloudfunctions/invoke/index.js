// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("event对象", event)
  // const {rectangle: {width, height}} = event
  // return {
  //   circum: (width + height) * 2,
  //   area: width * height
  // }
  console.log("context对象", context)
  console.log("wxContext对象", wxContext)
  const env = process.env
  console.log("env环境变量", env)
  return {event, context, wxContext, env}
  // const data = await db.collection("china")
  // .where({
  //   _id: _.exists(true)
  // })
  // .get()
  // console.log("data对象", data)   // data为undefined
  // return data   // 返回的data为空
}