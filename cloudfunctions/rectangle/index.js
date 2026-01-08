// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const {width, height} = event;
  try{
    console.log("长方形的周长与面积", [(width + height) * 2, width * height]);
    // let s = width * nonExit();
    return {
      circum: (width + height) * 2,
      area: width * height,
    }
  }catch(err){
    return "抛出错误：" + err.stack
  }
  // console.log("由于被return语句终止，这行代码不会执行，代码颜色也会灰色")
}