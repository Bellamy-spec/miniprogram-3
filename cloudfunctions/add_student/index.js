// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // const result = await db.collection('school').add({
  //   data: [
  //     {
  //       _id: "student001",
  //       name: "张梦慧",
  //       class_and_grade: "2024级04班",
  //       dorm: 611,
  //       bed: 8,
  //       gender: "女",
  //     },
  //     {
  //       _id: "student002",
  //       name: "李嘉然",
  //       class_and_grade: "2024级04班",
  //       dorm: 611,
  //       bed: 7,
  //       gender: "女",
  //     },
  //     {
  //       _id: "student003",
  //       name: "李锐臣",
  //       class_and_grade: "2024级04班",
  //       dorm: 671,
  //       bed: 6,
  //       gender: "男",
  //     },
  //   ]
  // })

  // const result = await db.collection('school')
  //   .where({
  //     class_and_grade: /高中/i,
  //   })
  //   .remove()

  switch(event.action){
    case 'addMany': {
      const result = await db.collection('school')
        .where({
          name: /张/i,
          gender: "女",
        })
        .update({
          data: {
            "name-en": "Girl Zhang",
          },
        })
      return result
    }
    case 'updateMany': {
      const result = await db.collection('school').where({
        name: /李/i,
        gender: "女",
      })
      .update({
        data: {
          // set操作符可以设定一个字段的值，字段值可以为对象
          // 当然也可以不用set操作符，直接赋值一个对象给字段
          // honour: _.set({
          //   name: "三好学生",
          //   en_name: "Three Good Student",
          // }),     // 添加一个字段
          honour: _.remove(),    // 删除字段
          position: _.rename("bed"),    // 修改字段名称
        },
      })
      return result
    }
    case 'incMany': {
      const result = await db.collection('school').where({
        name: /李/i,
        gender: "女",
      })
      .update({
        data: {
          bed: _.inc(10),
        },
      })
      return result
    }
  }
}