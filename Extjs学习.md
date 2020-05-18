# Demo位置

C:\Users\何超凡\Desktop\xidai\ExtjsDemo



# 在线文档

docs.sencha.com/extjs/6.5.2/classic/Ext.html



# api说明

1单例对象 SINGLETON

eg：Ext.Ajax

2类 xtype

## 创建对象

```
//通过new来创建
      var panel = new Ext.panel.Panel({
        width:200,
        height:100,
        title:'new panel',
        html:'hello',
        renderTo:'dd'  //或者不写div Ext.getBody()
      })


      //通过Ext.create来创建
      Ext.create('Ext.panel.Panel',{
        width:200,
        height:100,
        title:'create panel',
        html:'hello',
        renderTo:'dd'
      })

      //通过Ext.create和xtype来创建
      Ext.create({
        xtype:'panel',
        width:200,
        height:100,
        title:'Ext.create和xtype',
        html:'hello',
        renderTo:'dd'
      })

```



## 渲染方式

```

1renderTo
Ext.create('Ext.panel.Panel',{
        width:200,
        height:100,
        title:'create panel',
        html:'hello',
        renderTo:'dd'
      })
      
      
      <div id="dd"></div>
      
2render
//通过Ext.create和xtype来创建
      var panel = Ext.create({
        xtype:'panel',
        width:200,
        height:100,
        title:'render渲染',
        html:'hello',
        /*renderTo:'dd'*/
        listeners:{
          close:function () {
            console.log('close');
          }
        }
      })

      panel.render(Ext.getBody())
```



## 事件监听

```
1listeners
var panel = Ext.create({
        xtype:'panel',
        width:200,
        height:100,
        title:'render渲染',
        html:'hello',
        /*renderTo:'dd'*/
        listeners:{
          close:function () {
            console.log('close');
          }
        }
      })
      
2on
panel.on('close',function () {
        console.log('on的关闭');
      })
      
      
3addListener
panel.addListener('close',function () {
        console.log('addListener的关闭');
      })
```



# 面板panel

# 布局Layout

# 组件component

# 渲染Render

# 窗口 Window

# 对话框Dialog

# 提示框Message

# 工具栏Toolbar