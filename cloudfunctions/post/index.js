// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.action)
  switch(event.action){   // 根据调用云函数时传入的action值来调用不同的函数
    case 'addPost': {
      return addPost(event)
    }
    case 'deletePost': {
      return deletePost(event)
    }
    case 'updatePost': {
      return updatePost(event)
    }
    case 'getPost': {
      return getPost(event)
    }
    default: {
      return
    }
  }
};

async function addPost(event){
  return '创建一篇文章'   // 这里只是返回一个字符串，可以换成其他的函数。例如，在数据库里创建一篇文章
}
async function deletePost(event){
  return '删除一篇文章'
}
async function updatePost(event){
  return '更新一篇文章'
}
async function getPost(event){
  return '获取一篇文章'
}