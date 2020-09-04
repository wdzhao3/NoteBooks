// 数组翻转 array.prototype.reverse除外
function removeDup(array) {
    var i = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var n = array_1[_i];
        if (i === 0 || n > array[i - 1]) {
            array[i++] = n;
        }
    }
    return i;
}
var arr1 = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7];
console.log(removeDup(arr1));
