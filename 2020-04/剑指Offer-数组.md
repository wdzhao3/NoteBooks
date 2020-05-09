## 数组中重复的数字
```javascript
/**
 * 1.在一个长度为n的数组里的所有数字都在0到n-1的范围内。 
 * 数组中某些数字是重复的，但不知道有几个数字是重复的。
 * 也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 
 * 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。
 * @param {*数组} numbers 
 * @param {*空数组} duplication 
 * 思路：通过两个for循环判断是否存在相同的元素
 * 难度：易
 */
function duplicate(numbers, duplication) {
    if(numbers.length === 1 && numbers.length === null) return false;
    for(let i = 0;i<numbers.length;i++) {
        for(let j = numbers.length - 1;j>i;j--) {
            if(numbers[i] == numbers[j]) {
                duplication[0] = numbers[i]
                return true
            }
        }
    }
    return false
}
const array = [2,3,1,0,2,5,3]
console.log(duplicate(array,[]))
```
## 构建乘积数组
```javascript
/**
 * 2.给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],
 * 其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。
 * 不能使用除法。（注意：规定B[0] = A[1] * A[2] * ... * A[n-1]，
 * B[n-1] = A[0] * A[1] * ... * A[n-2];）
 * 思路：
 * 难度：中上
 * @param {*数组} array 
 */
function multiply(array) {
    let length = array.length
    let B = new Array(length)
    let ret = 1
    for(let i = 0;i<length;ret*=array[i++]) {
        console.log(ret)
        B[i] = ret
    }
    ret = 1
    for(let i=length-1;i>=0;ret*=array[i--]) {
        console.log(ret)
        B[i]*=ret
    }
    return B
}
const A = [1,2,3,4,5]
console.log(multiply(A))
```
## 二维数组查找