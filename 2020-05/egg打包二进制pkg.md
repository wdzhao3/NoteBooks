# 利用pkg打包Egg.js代码

## 全局安装pkg

    npm i pkg -g

## 动态 config 配置

项目根目录添加 app.js

```javascript
// 替换sequelize的storage，替换dataPath路径
var fs = require('fs');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    configWillLoad() {
        let customConfig = require(process.cwd() + '/config.js');
        this.app.config.sequelize.storage = customConfig.dbPath;
        this.app.config.dataPath = customConfig.dataPath;
    }
}
 
module.exports = AppBootHook;
```

这样可以利用周期读取外部config.js，然后替换config/config.default.js内容

## 配置 Egg.js 的文件路径

由于我们系统没有用到pbulic静态资源，暂时先不写。

Egg运行时生成的 run 文件夹在打包后将不能再进行写操作，故将rundir配置到运行路径下

```javascript
//修改config/config.default.js
   config.rundir = process.cwd() + '/run'
```

修改package.json的pkg配置，代码和静态文件的打包


```json
//修改package.json，增加pkg节点和bin节点
"pkg": {
	  "scripts": [
      "./app/**/*.js",
      "./app/*.js",
      "./config/*",
      "./config/**/*.js",
      "./normalJs/**/*.js",
      "./app.js",
      "./agent.js"
    ],
    "assets": [
      "./node_modules/**/*"
    ]
},
"bin": "build.js"
```

根目录下创建build.js文件

```javascript
// build.js文件内容
require(__dirname + '/node_modules/egg-scripts/bin/egg-scripts.js')
```

## 配置 build 命令

```json
"build:win": "pkg . --targets node12-win-x64 --out-path ./dist/win --debug",
"build:linux": "pkg . --targets node12-linux-x64 --out-path ./dist/linux --debug"
```

```javascript
// --targets 指定node版本为12以及win-x64
// --out-path 指定打包后文件输出路径
// --debug 指定debug模式编译
```

## 开始打包

    // 初次打包时间较长，后续打包pkg会使用node缓存，提高打包效率
    npm run build

## 运行

进入所在 .exe 文件目录

    middleware.exe start D:\xiangmu\NJTAMS\middleware --port=7007 --title=middleware

## 注意

+ linux程序需要在linux环境下打包。