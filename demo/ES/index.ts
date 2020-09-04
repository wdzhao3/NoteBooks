// 数组翻转 array.prototype.reverse除外
function removeDup(array:Array<number>) {
  let i: number = 0;
  for (let n of array) {
    if( i === 0 || n > array[i - 1]) {
      array[i++] = n;
    }
  }
  return i 
}
let arr1:Array<number> = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7]
removeDup(arr1)