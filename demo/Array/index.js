// 生成大数组
const arr1 = new Array(10).fill(0).map((item, index) => index + 1)
const arr2 = Array.from(Array(10), (v, k) => k + 1)
const ary3 = [...Array(10).keys()]
// console.log(arr1, arr2, ary3)
//
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const duplicatedValues = [...new Set(a)].filter(item => b.includes(item))
const diffValues = [...new Set([...a, ...b])].filter(item => !b.includes(item) || !a.includes(item)) 
console.log(duplicatedValues,diffValues)