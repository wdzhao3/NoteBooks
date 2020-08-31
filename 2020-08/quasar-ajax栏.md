# props
## behavior
### skip-hijack
type：Boolean  
Description：跳过Ajax请求
### reverse
type：Boolean  
Description：进程反向
## content
### position
type：String  
Description：Ajax栏的位置  
default value："top"  
value：top right bottom left
## style
### size
type：String  
Description：大小设置  
default value："2px"  
### color
type：String  
Description：颜色  
examples："primary"  
# event
### @start
type：function  
Description：Ajax栏开始时触发
### @stop
type：function
Description：请求结束时触发  
# methods
### start([array]) => void()
Description：触发执行开始方法
#### array 
type：Number  
default value：300  
Description：为0则不自动递增
### increment([amount]) => void()
Description：手动递增
#### amount
type：0 < amount < 100  
### stop() => void()
Description：结束方法