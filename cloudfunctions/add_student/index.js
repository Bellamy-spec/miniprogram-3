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
    case 'updateUser': {
      const result = await db.collection('user').where({
        tags: _.elemMatch(_.eq("视频"))
      })
      .update({
        data: {
          // tags: _.push({
          //   each: ["漫画", "视频", "历史"],     // 把3个元素添加到数组
          //   // position: 3,    // 从第4位开始，也就是第3位的后面添加
          //   slice: -5,     // slice(n)表示数组只保留前n个元素，n为0时数组会被清空；为负数时，只保留后n个元素
          // }),
          tags: _.pull("汽车"),
        }
      })
      return result
    }
    case 'updateBooks': {
      const result = await db.collection('user')
      .where({
        "books.publishInfo.press": "人邮社"
      })
      .update({
        data: {
          "books.$.publishInfo.press": "人民邮电出版社"
        }
      })
      return result
    }
    case 'updateUserBytemp': {
      // 将where()内的条件赋值给一个变量
      const query = {
        tags: _.elemMatch(_.eq("美食"))
      }

      // 含有更新请求里的data对象赋值给一个变量
      const updatequery = {
        tags: _.push({
          each: ["教育", "财经", "军事"],
          position: 3,
          slice: 100
        })
      }

      const result = await db.collection('user').where(query)
      .update({
        data: updatequery
      })
      return result
    }
    case 'updateBooksBytemp': {
      const num = 2
      const result = await db.collection('user').where({
        _id: "user001"
      })
      .update({
        data: {
          [`books.${num}.publishInfo.press`]: "我家的出版社"
        }
      })
      return result
    }
  }
}