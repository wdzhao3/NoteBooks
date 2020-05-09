# JS从文件选择到上传

## 创建文件选择input

因为样式问题，我们会自定义文件选择按钮的样式，因为它可能是按钮、卡片、上传面板...，所以，我们将创建一个隐藏的按钮，通过绑定事件触发。

*这里我们使用 DocumentFragment 文档片段的形式来创建dom，然后挂载的到HTML中的div上，以下代码仅供参考*

```javascript
let fragment = document.createDocumentFragment();
let inputEle = document.createElement("input");
inputEle.setAttribute("id", "avatar");
inputEle.setAttribute("name", "avatar");
inputEle.setAttribute("accept", "image/png, image/jpeg, image/gif, image/jpg, pdf, txt");
fragment.appendChild(inputEle);
document.getElementById("divDemo").appendChild(fragment)
```

如果你需要手动实现一个js文件上传插件，你需要监听到几个位置的变化：

当文件选择结束时：我们监听input文件选择框的onchange()

