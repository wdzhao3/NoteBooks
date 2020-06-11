## Window 下安装

下载 https://nginx.org/en/download.html

下载后解压安装（路径不能包含中文）

### 启动

1. 直接双击nginx.exe
2. 命令行输入start nginx

### 验证

开启服务后打开 http://localhost 会出现 <b>Welcome to nginx</b>

### 基本指令

启动服务：start nginx  
退出服务：nginx -s quit  
强制关闭服务：nginx -s stop  
重载服务：nginx -s reload　　（重载服务配置文件，类似于重启，服务不会中止）  
验证配置文件：nginx -t  
使用配置文件：nginx -c "配置文件路径"  
使用帮助：nginx -h  

