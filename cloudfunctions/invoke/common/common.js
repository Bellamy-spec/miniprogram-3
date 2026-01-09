const key = {
  AppID: 'wx197d637775f6fa46',
}

const getName = (msg) => {
  return msg + '郭雨健';
};

// 判断是否为数字
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

// 元素在数组的索引
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

exports.key = key
exports.getName = getName
exports.validateNumber = validateNumber
exports.indexOfAll = indexOfAll