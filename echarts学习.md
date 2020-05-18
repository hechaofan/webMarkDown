# echarts学习

```js
 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.getElementById('main'));

 // 指定图表的配置项和数据
 var option = {
    //标题组件，包含主标题和副标题。
     title: {
         text: 'ECharts 入门示例',//主标题
         subtext: '',//副标题
         left:150,//距离 也可以是center right
         borderColor:'#ccc',//边框颜色
     },
     //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
     toolbox:{
       show:true,
       feature:{ //各工具配置项。
        saveAsImage:{
          show:true
        },
        magicType: { //动态类型切换
          type: ['line', 'bar', 'stack', 'tiled']
      }
       }
     },
     //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）。
     grid:{},
     //提示框组件。
     tooltip: {
      trigger:'item'//'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
     },
     //图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
     legend: {
         data:['销量']
     },
     //x坐标
     xAxis: {
         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
     },
     //y坐标
     yAxis: {},
     //系列列表。每个系列通过 type 决定自己的图表类型
     series: [{
         name: '销量',
         type: 'bar',
         barWidth : 30,//柱形图宽度
         data: [5, 20, 36, 10, 10, 20],
         itemStyle: {
              normal: {
                color: '#ff9966',//设置样式
                /*lineStyle: {
                  color: color
                },
                borderColor: color*/
              }
            },
         markPoint:{ //数据标点
           data:[
             {type:'max',name:'最大值'},
             {type:'min',name:'最小值'},
           ]
         },
         markLine:{ //数据标线
          data:[
            {type:'average',name:'平均值'}
          ]
        },
     }],
     //极坐标系，可以用于散点图和折线图。每个极坐标系拥有一个角度轴和一个半径轴。
     polar:{},
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
```



学习视频：<https://www.imooc.com/video/12210> 