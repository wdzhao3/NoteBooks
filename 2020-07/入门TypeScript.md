# 数据类型
+ 原始数据类型：布尔值、数值、字符串、null、unindefined、Symbol
+ 对象类型： Object  

## 布尔值
```javascript
let isDone: boolean = false;
```

## 数值
```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 字符串
```javascript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```
## 空值
javascript中没有空值void的概念，TypeScript中使用void表示没有返回值的函数
```javascript
function alertName(): void {
    alert('My name is Tom');
}
```
## Null和Undefined
在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型。  
与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量。  
```javascript
let u: undefined = undefined;
let n: null = null;
```
## 任意值
任意值（Any）用来表示允许赋值为任意类型。  
```javascript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。
# 类型推论
如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
```javascript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。  
# 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。
```javascript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型。  
# 对象的类型-接口（Interfaces）
## 什么是接口
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。  
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。  
```javascript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```
定义的变量比接口少了一些或者多一些属性是不允许的。
## 可选属性
```javascript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```
## 任意属性
```javascript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```
## 只读属性
只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候。
```javascript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

# 数组类型
## 多种定义数组的方式
```javascript
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: Array<number> = [1, 1, 2, 3, 5];// 泛型，参考泛型
// 接口来表示数组，这种使用比较复杂。常用来表示类数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// 常用
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```
## 类数组

。。。

# 函数类型
函数是javascript中的一等公民。  
## 函数声明
```javascript
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
// 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到。  
输入多余的（或者少于要求的）参数，是不被允许的。  
不要混淆了 TypeScript 中的 => 和 ES6 中的 => 。  
在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。  
