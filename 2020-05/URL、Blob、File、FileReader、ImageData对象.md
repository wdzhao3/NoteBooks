***参考来源***  

*基本的定义大部分来自MDN*

## URL对象

URL接口是一个包含若干静态方法的对象

可以通过Window.URL来访问该对象（webkit和Blink内核浏览器可以用Window.webkitURL代替,Web Worker 中也可使用）

### 构造器语法

```javascript
let url = new URL(url, [base])
```

url是一个绝对或相对URL的DOMString

base是基准URL的DOMString，url是绝对URL时是无效的

### 属性

URLUtils.href

```javascript
// Lets imagine an <a id="myAnchor" href="https://developer.mozilla.org/en-US/HTMLHyperlinkElementUtils/href"> element is in the document
var anchor = document.getElementById("myAnchor");
var result = anchor.href; // Returns: 'https://developer.mozilla.org/en-US/HTMLHyperlinkElementUtils/href'
```
返回包含完整的URL的DOMString，上诉案例可以直接获取a标签中的href

URLUtils.protocol

```javascript
// Let's an <a id="myAnchor" href="https://developer.mozilla.org/en-US/HTMLHyperlinkElementUtils.protocol"> element be in the document
var anchor = document.getElementById("myAnchor");
var result = anchor.protocol; // Returns:'https:'
```
获取协议名，包含“:”

URLUtils.host

```javascript
var anchor = document.createElement("a");

anchor.href = "https://developer.mozilla.org/en-US/HTMLHyperlinkElementUtils.host"
anchor.host == "developer.mozilla.org"

anchor.href = "https://developer.mozilla.org:443/en-US/HTMLHyperlinkElementUtils.host"
anchor.host == "developer.mozilla.org"
// The port number is not included because 443 is the scheme's default port

anchor.href = "https://developer.mozilla.org:4097/en-US/HTMLHyperlinkElementUtils.host"
anchor.host == "developer.mozilla.org:4097"
```
返回包含URL域名和':'，和端口号，（443端口不返回，这是默认端口）

URLUtils.hostname

返回域名

URLUtils.port

返回端口号

URLUtils.pathname

返回域名后的URL的DOMString

URLUtils.search

返回包含？后的请求参数的DOMString

URLUtils.hash

返回包含#后的锚点标记的DOMString

URLUtils.username

返回域名前面的用户名的DOMString

URLUtils.password

返回域名前的密码的DOMString

URLUtils.searchParams


    感觉可以用来解析url，不需要拼字符串那么low了

### 方法

URLUtils.toString()

返回一个包含完整 URL 的 DOMString。它是 URLUtils.href 的别名，但区别在于 toString 不能用于修改值。

URL.createObjectURL()

返回一个DOMString ，包含一个唯一的blob链接（该链接协议为以blob:，后跟唯一标识浏览器中的对象的掩码）。

    可以将文件、图片生成一个URL链接直接使用

URL.revokeObjectURL()

销毁之前使用URL.createObjectURL()方法创建的URL实例。

## Blob对象

介绍File对象前要先说下Blob，Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

    换句话说就是Blob是File的父类型。

### 构造器

要从其他非blob对象和数据构造一个 Blob，使用 Blob() 构造函数。

```javascript
var aBlob = new Blob( array, options );
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // 得到 blob
```
array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体

options 包含以下两个属性type，指定内容的MIME类型。endings，指定换行符结尾的\n如何被写入。

使用字符串构造一个Blob
```javascript
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
```
    这个感觉比较有用，可以创建Blob然后转file

使用Blob创建一个指向类型化数组的URL
```javascript
var typedArray = GetTheTypedArraySomehow();
var blob = new Blob([typedArray.buffer], {type: 'application/octet-stream'}); // 传入一个合适的 MIME 类型
var url = URL.createObjectURL(blob);
// 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用普通 URL 那样使用它，比如用在 img.src 上。
```

```javascript
    // 兼容的方式
    // 传入File或Blob对象
    function createObjectURL(blob) {
        if(window.URL) {
            return window.URL.createObject(blob)
        } else if(Window.webkieURL) {
            return return window.webkitURL.createObject(blob)
        } else {
            return null
        }
    }
    // 将blob对象转为URL地址实质是将文件信息保存在了内存中，可以直接在DOM中使用，只要引用内存就不会被释放，页面卸载时会被释放，可以手动释放内存  
    // 兼容写法
    function revokeObjectURL(url) {
        if(window.URL) {
            return window.URL.revokeObject(url)
        } else if (window.webkitURL) {
            return window.webkitURL.revokeObject(url)
        }
    }
```

读取Bolb内容
```javascript
// 1.使用FileReader对象
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含被转化为类型数组 typed array 的 blob
});
reader.readAsArrayBuffer(blob);
// 2.Blob.text()
```

### 属性
Blob不可变更，size和type属性只读

### 方法
Blob.slice([start[, end[, contentType]]])

返回一个新的Blob对象，start起始字节下标， end结束字节下标，contentType 新的文档类型。

    这样就可以修改Blob对象类型了，因为通过Blob创建的File类型其实还是Blob的原始类型，File.type是无效的属性。
    另外，这个方法可以读取Blob部分内容
    兼容的写法如下

```javascript
function bolbSlice(blob) {
    if(blob.slice) {
        return blob.slice(0, blob.size, 'image/jpeg')
    } else if(blob.webkitSlice) {
        return blob.webkitSlice(0, blob.size, 'image/jpeg')
    } else if(blob.mozSlice) {
        return blob.mozSlice(0, blob.size, 'image/jpeg')
    }
}
```

Blob.stream()

Blob接口的stream() 方法返回一个ReadableStream对象，读取它将返回包含在Blob中的数据。

**使用说明**

使用 stream() 函数与其返回的ReadableStream对象，你将得到一些有趣的能力：
+ 调用方法getReader()，在返回的stream上获取一个对象，通过 ReadableStreamDefaultReader接口提供的read()方法读取blob对象的方法。
+ 调用返回stream对象的pipeTo()方法将blob对象的数据传输到可写流。
+ 调用返回stream对象的tee()方法以准备可读流。该方法会返回一个数组，该数组包含两个新的 ReadableStream 对象，每个对象都会返回 Blob的内容。
+ 调用返回stream对象的pipeThrough()方法，通过一个TransformStream对象或其它任意可读可写对传输流对象。

    这样是可以使用stream流对象

Blob.text()

返回一个promise且包含blob所有内容的UTF-8格式的 USVString。
```javascript
var textPromise = blob.text();

blob.text().then(text => /* 执行的操作…… */);

var text = await blob.text();
```
**注意**

+ blob.text()只能使用UTF-8编码，而File的FileReader.readAsText()可以使用不同方式。

Blob.arrayBuffer()

返回一个promise且包含blob所有内容的二进制格式的 ArrayBuffer 
```javascript
var bufferPromise = blob.arrayBuffer();

blob.arrayBuffer().then(buffer => /* 处理 ArrayBuffer 数据的代码……*/);

var buffer = await blob.arrayBuffer();
```

## FIle对象

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

+ 通常情况下File对象来自 <kbd> input </kbd> 元素上返回的FileList对象。
+ 由自由拖拽操作生成的 <kbd> DataTransfer </kbd> 对象。
+ 来自 <kbd> HTMLCanvasElement </kbd> 上的 <kbd> mozGetAsFile() </kbd> API。
+ 在Gecko中，特权代码可以自由创建代表任何本地文件的File  

.  

    Gecko指渲染引擎

### 属性（只读）

File.lastModified

返回当前 File 对象所引用文件最后修改时间（1970.1.1以来的毫秒数）

File.lastModifiedDate

返回当前 File 对象所引用文件最后修改时间的 Date 对象。

File.webkitRelativePath

返回 File 相关的 path 或 URL

name、size、type分别为名称、大小、类型

### 方法

只从Blob继承了slice()

## FileReader

FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

    FileReader实现的是一个异步读取文件的机制，js可以通过这个api读取文件

### 构造函数

`var reader = new FileReader();`

### 属性（只读）

FileReader.error 一个DOMException，表示在读取文件时发生的错误 。

FileReader.readyState EMPTY：0：没有加载任何数据；LOADING：1：数据正在被加载；DONE：2：已完成全部的读取请求。

FileReader.result 文件的内容。该属性仅在读取操作完成后才有效

### 事件方法

FileReader.onabort 读取被中断时触发

FileReader.onerror 读取发生错误时触发

```javascript
var reader = new FileReader();
  reader.onerror = function(event) {
  reader.abort();
};
```

FileReader.onload 读取完成时触发

```javascript
var reader = new FileReader();
  reader.onload = function(event) {
    // 文件里的文本会在这里被打印出来
    console.log(event.target.result)
  };
```

    onloadstart、onloadend、onprogress等方法可能不适用了

### 方法

FileReader.abort() 终止读取操作，readyState为DONE。

FileReader.readAsArrayBuffer() 开始以ArrayBuffer方式读取

FileReader.readAsBinaryString() 开始以原始二进制方式读取

FileReader.readAsDataURL() 开始读取，返回URL格式的base64字符串

FileReader.readAsText() 读取文件内容

    将文件转URL在blob的内容里提到了
    
    读取部分内容，同Blob中的slice()

    读取拖放的文件

    XHR上传文件

## ImageData对象

### 构造器

```javascript
new ImageData(array, width, height);
new ImageData(width, height);

var imageData = new ImageData(100, 100); // Creates a 100x100 black rectangle
// ImageData { width: 100, height: 100, data: Uint8ClampedArray[40000] }
```

array：包含图像隐藏像素的 Uint8ClampedArray 数组。如果数组没有给定，指定大小的黑色矩形图像将会被创建。

width：宽度。

height： 高度。

### 属性（只读）

ImageData.data

ImageData.width

ImageData.height

***

后续会补充一篇关于创建2D图像。