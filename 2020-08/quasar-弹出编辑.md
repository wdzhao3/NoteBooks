# props
## behavior
### touch-position
type：Boolean  
Description：当单机或触摸时允许在鼠标位置显示弹出
### persistent
type：Boolean  
Description：通过ESC或点击弹出外来关闭弹出
### separate-close-popup
Description：与父菜单分离，将其标记为v-close-popup的单独关闭点（如果没有这个，链接菜单将全部关闭） 
## content 
### title
type：String  
Description：可选标题（除非使用“标题”槽） 
### buttons
type：Boolean  
Description：显示设置和取消按钮
### label-set
type：String  
Description：覆盖设置按钮标签
### label-cencel
type：String  
Description：覆盖取消按钮标签
## model
### value
type：Any  
Description：绑定的数据
### validate
type：function  
Description：验证方法，然后触发“save”并关闭Popup；返回一个布尔值（“true”表示有效，“false”表示中止）；语法：validate（value）；为了获得最佳性能，请从您的作用域引用它，而不要内联定义它
## position
### fit
type：Boolean  
Description：允许菜单至少匹配其目标的全宽
### cover
type：Boolean  
default value：true  
Description：允许菜单覆盖其目标。使用时，“self”和“fit”不再有效
### anchor
type：String  
Description：两个值设置菜单相对于其目标的起始位置或定位点
value：“top left” “top middle” “top right” “center left” “center middle” “center right” “bottom left” “bottom middle” “bottom right”
### self
type：String  
Description：两个值设置菜单相对于其目标的自身位置
value：“top left” “top middle” “top right” “center left” “center middle” “center right” “bottom left” “bottom middle” “bottom right”
## state
### disable
type：Boolean  
Description：将组件置于禁用模式
## style
### content-class
type：String  
Description：内容样式的class类
### content-style
type：String  
Description：内容样式的style
ex：background-color: #ff0000  :content-style="{ color: '#ff0000' }"
### color
type：String  
Description：颜色设置
### offset
type：Array  
Description：以像素为单位水平和垂直偏移菜单的两个数字数组
### square
type：Boolean  
Description：强制菜单具有方形边框
### max-height
type：String  
Description：菜单的最大高度；以CSS单位表示的大小，包括单位名称
### max-width
type：String  
Description：菜单的最大宽度；以CSS单位表示的大小，包括单位名称
# slots
### title
Description：自定义插槽
# scopedslots
### default
Description：用于注入表单组件
# events
### @input->function(value)
Description：当弹出窗口被取消以便将模型重置为其初始值时发出；也被v-model使用
### @before-show->function(evt)
Description：在弹出窗口显示之前发出
### @show->function()
Description：弹出窗口显示后立即发出
### @before-hide->function(evt)
Description：在弹出窗口被解除之前发出
### @hide->function()
Description：在弹出窗口被关闭之后立即发出
### @save->function(value,initialValue)
Description：当值已成功验证并应保存时发出
### @cancel->function(value,initialValue)
Description：当用户取消更改时发出（按ESC键或在弹出窗口外单击或单击“取消”按钮）
# methods
### set() => void()
Description：触发模型更新；验证模型（如果是这样的话，发出“save”事件），然后关闭弹出窗口
### cancel() => void()
Description：触发模型重置为其初始值（发出“取消”事件），然后关闭弹出窗口