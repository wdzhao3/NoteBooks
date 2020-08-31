# props
## behavior
### tick-strategy
type：String  
default value："none"  
value：none strict leaf leaf-filtered  
Description：勾选策略
### default-expand-all
type：Boolean  
default value：false  
Description：初始展开所有树分支  
### accordion
type：Boolean  
Description：手风琴（同级之展开一个节点）  
## content
### nodes
type：Array  
Required  
Description：传入的数组  
### node-key
type：String  
Required  
Description：主键属性  
### label-key
type：String  
default value：label
Description：显示的label属性
### icon
type：String  
Description：使用前缀图标  
### no-nodes-label
type：String  
Description：没有节点数据时显示的字符串
### no-result-label
type：String  
Description：筛选空数据时显示
### filter
type：String  
Description：筛选文本的值
### filter-method ？
type：Function  
Description：筛选数据的方法  
## state
### ticked
type：Array  
Description：勾选的节点数组
### expanded
type：Array  
Description：展开节点的数组
### selected
type：Any  
Description：当前选定的节点的键
## style
### no-connectors
