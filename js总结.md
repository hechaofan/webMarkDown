



# 数据类型转换

## number转换为string

一、双点解析

```
10..toString();
```

二、括号先计算再转换

```
(10).toString();
```

三、加空串

```
10 + ''
```



## string转换为number

方法主要有三种

**转换函数**、**强制类型转换**、利用**js变量弱类型转换**。

1. 转换函数：

js提供了parseInt()和parseFloat()两个转换函数。前者把值转换成整数，后者把值转换成浮点数。只有对String类型调用这些方法，这两个函数才能正确运行；对其他类型返回的都是NaN(Not a Number)。

一些示例如下：

 

复制代码 代码如下:

parseInt("1234blue"); //returns 1234
parseInt("0xA"); //returns 10
parseInt("22.5"); //returns 22
parseInt("blue"); //returns NaN

 

parseInt()方法还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。基是由parseInt()方法的第二个参数指定的，示例如下：

 

复制代码 代码如下:

parseInt("AF", 16); //returns 175
parseInt("10", 2); //returns 2
parseInt("10", 8); //returns 8
parseInt("10", 10); //returns 10

 

如果十进制数包含前导0，那么最好采用基数10，这样才不会意外地得到八进制的值。例如：

 

复制代码 代码如下:

parseInt("010"); //returns 8
parseInt("010", 8); //returns 8
parseInt("010", 10); //returns 10

 

parseFloat()方法与parseInt()方法的处理方式相似。
使用parseFloat()方法的另一不同之处在于，字符串必须以十进制形式表示浮点数，parseFloat()没有基模式。

下面是使用parseFloat()方法的示例：

 

复制代码 代码如下:

parseFloat("1234blue"); //returns 1234.0
parseFloat("0xA"); //returns NaN
parseFloat("22.5"); //returns 22.5
parseFloat("22.34.5"); //returns 22.34
parseFloat("0908"); //returns 908
parseFloat("blue"); //returns NaN

 

\2. 强制类型转换

还可使用强制类型转换（type casting）处理转换值的类型。使用强制类型转换可以访问特定的值，即使它是另一种类型的。
ECMAScript中可用的3种强制类型转换如下：
Boolean(value)——把给定的值转换成Boolean型；
Number(value)——把给定的值转换成数字（可以是整数或浮点数）；
String(value)——把给定的值转换成字符串。
用这三个函数之一转换值，将创建一个新值，存放由原始值直接转换成的值。这会造成意想不到的后果。
当要转换的值是至少有一个字符的字符串、非0数字或对象（下一节将讨论这一点）时，Boolean()函数将返回true。如果该值是空字符串、数字0、undefined或null，它将返回false。

可以用下面的代码段[测试](http://lib.csdn.net/base/softwaretest)Boolean型的强制类型转换。

 

复制代码 代码如下:

Boolean(""); //false – empty string
Boolean("hi"); //true – non-empty string
Boolean(100); //true – non-zero number
Boolean(null); //false - null
Boolean(0); //false - zero
Boolean(new Object()); //true – object

 

Number()的强制类型转换与parseInt()和parseFloat()方法的处理方式相似，只是它转换的是整个值，而不是部分值。示例如下：

 

复制代码 代码如下:

用　　法 结　　果
Number(false) 0
Number(true) 1
Number(undefined) NaN
Number(null) 0
Number( "5.5 ") 5.5
Number( "56 ") 56
Number( "5.6.7 ") NaN
Number(new Object()) NaN
Number(100) 100

 

最后一种强制类型转换方法String()是最简单的，示例如下：

 

复制代码 代码如下:

var s1 = String(null); //"null"
var oNull = null;
var s2 = oNull.toString(); //won't work, causes an error

 

\3. 利用js变量弱类型转换

举个小例子，一看，就会明白了。

 

复制代码 代码如下:

<script>
var str= '012.345 ';
var x = str-0;
x = x*1;
</script>

 

上例利用了js的弱类型的特点，只进行了算术运算，实现了字符串到数字的类型转换，不过这个方法还是不推荐的



# [正则表达式](https://www.cnblogs.com/huangf714/p/6252567.html)

 

1.正确表达式

"^\\d+$"　　//非负整数（正整数 + 0）
"^[0-9]*[1-9][0-9]*$"　　//正整数
"^((-\\d+)|(0+))$"　　//非正整数（负整数 + 0）
"^-[0-9]*[1-9][0-9]*$"　　//负整数
"^-?\\d+$"　　　　//整数
"^\\d+(\\.\\d+)?$"　　//非负浮点数（正浮点数 + 0）
"^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$"　　//正浮点数
"^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$"　　//非正浮点数（负浮点数 + 0）
"^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$"　　//负浮点数
"^(-?\\d+)(\\.\\d+)?$"　　//浮点数

```
new RegExp(/^\d+$/).test(value)
```

2、使用方法

  var r = /^\+?[1-9][0-9]*$/;　　//正整数

  String str = "123";
  boolean flag=r.test(str);

  如果判断为正整数，则flag为true
3、JS整数相加
  首先保证输入的都是数字
  nText1=parseFloat(document.all.text1.value);
  nText2=parseFloat(document.all.text2.value);
  nSum=nText1+nText2

 

 

4.总结

Require : /.+/,
Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
Mobile : /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/,
Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
Currency : /^\d+(\.\d+)?$/,
Number : /^\d+$/,
Zip : /^[1-9]\d{5}$/,
QQ : /^[1-9]\d{4,8}$/,
Integer : /^[-\+]?\d+$/,
Double : /^[-\+]?\d+(\.\d+)?$/,
Float: /^[-\+]?\d+(\.\d+)?$/,
Float2: /^(0|[1-9]\d{0,3})(\.\d{0,2})?$/,
English : /^[A-Za-z]+$/,
Chinese : /^[\u0391-\uFFE5]+$/,
DateTime:/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s\d{1,2}:\d{1,2}:\d{1,2})?$/,
UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
IsSafe : function(str){return !this.UnSafe.test(str);},
SafeString : "this.IsSafe(value)",
Limit : "this.limit(value.length,getAttribute('min'), getAttribute('max'))",
LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
Range : "getAttribute('min') < value && value < getAttribute('max')",
Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
Custom : "this.Exec(value, getAttribute('regexp'))",
Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",

 

详细说明-几种基本数字验证：

只能输入数字

表达式  ^[0-9]*$  
描述  匹配任意个数字  
匹配的例子  12345678,1234567  
不匹配的例子  E, 

只能输入某个区间数字

表达式  ^[12-15]$  
描述  匹配某个区间的数字  
匹配的例子  12,13,14,15  
不匹配的例子   

只能输入0和非0打头的数字

表达式  ^(0|[1-9][0-9]*)$  
描述  可以为0，第一个数字不能为0，数字中可以有0  
匹配的例子  12,10,101,100  
不匹配的例子  01, 

只能输入实数

表达式  ^[-+]?\d+(\.\d+)?$  
描述  匹配实数  
匹配的例子  18,+3.14,-9.90  
不匹配的例子  .6,33s,67-99

只能输入n位小数的正实数

表达式  ^[0-9]+(.[0-9]{n})?$以^[0-9]+(.[0-9]{2})?$为例  
描述  匹配n位小数的正实数  
匹配的例子  2.22  
不匹配的例子  2.222,-2.22, 

只能输入m-n位小数的正实数

表达式  ^[0-9]+(.[0-9]{m,n})?$以^[0-9]+(.[0-9]{1,2})?$为例  
描述  匹配m到n位小数的正实数  
匹配的例子  2.22,2.2  
不匹配的例子  2.222,-2.2222, 

只能输入非0的正整数

表达式  ^\+?[1-9][0-9]*$  
描述  匹配非0的正整数  
匹配的例子  2,23,234  
不匹配的例子  0,-4, 

只能输入非0的负整数

表达式  ^\-[1-9][0-9]*$  
描述  匹配非0的负整数  
匹配的例子  -2,-23,-234  
不匹配的例子  0,4, 

只能输入n个字符

表达式  ^.{n}$ 以^.{4}$为例  
描述  匹配n个字符，注意汉字只算1个字符  
匹配的例子  1234,12we,123清,清清月儿  
不匹配的例子  0,123,123www, 

只能输入英文字符

表达式  ^.[A-Za-z]+$为例  
描述  匹配英文字符，大小写任意  
匹配的例子  Asp,WWW,  
不匹配的例子  0,123,123www, 

只能输入大写英文字符

表达式  ^.[A-Z]+$为例  
描述  匹配英文大写字符  
匹配的例子  NET,WWW,  
不匹配的例子  0,123,123www, 

只能输入小写英文字符

表达式  ^.[a-z]+$为例  
描述  匹配英文大写字符  
匹配的例子  asp,csdn  
不匹配的例子  0,NET,WWW, 

只能输入英文字符+数字

表达式  ^.[A-Za-z0-9]+$为例  
描述  匹配英文字符+数字  
匹配的例子  1Asp,W1W1W,  
不匹配的例子  0,123,123,www, 

只能输入英文字符/数字/下划线

表达式  ^\w+$为例  
描述  匹配英文字符或数字或下划线  
匹配的例子  1Asp,WWW,12,1_w  
不匹配的例子  3#,2-4,w#$, 

密码举例

表达式  ^.[a-zA-Z] \w{m,n}$  
描述  匹配英文字符开头的m-n位字符且只能数字字母或下划线  
匹配的例子    
不匹配的例子   

验证首字母大写 
表达式  \b[^\Wa-z0-9_][^\WA-Z0-9_]*\b  
描述  首字母只能大写  
匹配的例子  Asp,Net  
不匹配的例子   

验证网址（带?id=中文）VS.NET2005无此功能 
表达式  ^http:\/\/([\w-]+(\.[\w-]+)+(\/[\w- .\/\?%&=\u4e00-\u9fa5]*)?)?$ 
描述  验证带?id=中文  
匹配的例子  ,
<http://blog.csdn.net/?id>=清清月儿  
不匹配的例子   

验证汉字 
表达式  ^[\u4e00-\u9fa5]{0,}$  
描述  只能汉字  
匹配的例子  清清月儿  
不匹配的例子   

验证QQ号 
表达式  [0-9]{5,9}  
描述  5-9位的QQ号  
匹配的例子  10000,123456  
不匹配的例子  10000w, 

验证电子邮件（验证MSN号一样）  
表达式  \w+([-+.´]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*  
描述  注意MSN用非hotmail.com邮箱也可以  
匹配的例子  [aaa@msn.com](mailto:aaa@msn.com)  
不匹配的例子  [111@1](mailto:111@1). 

验证身份证号（粗验，最好服务器端调类库再细验证） 
表达式  ^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$  
描述    
匹配的例子  15或者18位的身份证号，支持带X的  
不匹配的例子   

验证手机号（包含159，不包含小灵通） 
表达式  ^13[0-9]{1}[0-9]{8}|^15[9]{1}[0-9]{8}  
描述  包含159的手机号130-139 
匹配的例子  139XXXXXXXX  
不匹配的例子  140XXXXXXXX, 

验证电话号码号（很复杂，VS.NET2005给的是错的） 
表达式（不完美 ）  方案一 ((\(\d{3}\)|\d{3}-)|(\(\d{4}\)|\d{4}-))?(\d{8}|\d{7})
方案二 (^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$) 支持手机号但也不完美  
描述  上海：02112345678 3+8位
上海：021-12345678
上海：(021)-12345678
上海：(021)12345678
郑州：03711234567 4+7位
杭州：057112345678 4+8位
还有带上分机号，国家码的情况
由于情况非常复杂所以不建议前台做100%验证，到目前为止似乎也没有谁能写一个包含所有的类型 ，其实有很多情况本身就是矛盾的。
如果谁有更好 的验证电话的请留言 
匹配的例子    
不匹配的例子   

验证护照 
表达式  (P\d{7})|G\d{8}) 
描述  验证P+7个数字和G+8个数字  
匹配的例子    
不匹配的例子   

验证IP 
表达式  ^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$ 
描述  验证IP  
匹配的例子  192.168.0.1 222.234.1.4  
不匹配的例子   

验证域  
表达式  ^[a-zA-Z0-9]+([a-zA-Z0-9\-\.]+)?\.(com|org|net|cn|com.cn|edu.cn|grv.cn|)$ 
描述  验证域  
匹配的例子  csdn.net baidu.com it.com.cn  
不匹配的例子  192.168.0.1 

验证信用卡  
表达式  ^((?:4\d{3})|(?:5[1-5]\d{2})|(?:6011)|(?:3[68]\d{2})|(?:30[012345]\d))[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4}|3[4,7]\d{13})$ 
描述  验证VISA卡，万事达卡，Discover卡，美国运通卡  
匹配的例子    
不匹配的例子   

验证ISBN 国际标准书号  
表达式  ^(\d[- ]*){9}[\dxX]$ 
描述  验证ISBN国际标准书号  
匹配的例子  7-111-19947-2  
不匹配的例子   

验证GUID 全球唯一标识符  
表达式  ^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$ 
描述  格式8-4-4-4-12  
匹配的例子  2064d355-c0b9-41d8-9ef7-9d8b26524751  
不匹配的例子   

验证文件路径和扩展名  
表达式  ^([a-zA-Z]\:|\\)\\([^\\]+\\)*[^\/:*?"<>|]+\.txt(l)?$ 
描述  检查路径和文件扩展名  
匹配的例子  E:\mo.txt  
不匹配的例子  E:\ , mo.doc, E:\mo.doc , 

验证Html颜色值  
表达式  ^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$ 
描述  检查颜色取值  
匹配的例子  #FF0000  
不匹配的例子 



# 数组

<https://www.jianshu.com/p/105b7653084e> 



**过虑对象id相同,count相加，返回新的对象**

```
let data = [
    {id:1,name:'张三',age:12},
    {id:1,name:'张三',age:12},
    {id:1,name:'张三',age:12},
    {id:2,name:'张1三',age:12},
    {id:2,name:'张1三',age:12},
    {id:2,name:'张1三',age:12},
    {id:2,name:'张1三',age:12},
]
  let arr =   []
  data.map(item=>{
    arr.push(item.id)
  })
  // 去重
  arr = Array.from(new Set(arr))
  // 最后的新数组
  let newArr = []
  arr.map(item=>{
    let arr1 = data.filter(item1=>item1.id === item)
    let num  = 0
    arr1.map((item1,index)=>{
      num+= item1.age
      if(index===arr1.length-1){
       item1.age = num
       newArr.push(item1)
      }
    })
  })
```



## forEach

```
let newaAllMarkPath = []
allMarkPath.forEach((el,index) =>{
                    newaAllMarkPath[index] = 'http://develop.like-take.com/resources/deviceImages/' + el
                  })
```



## findIndex

```
removeGoodId(layer,id){
        var index = this.tableDataArr[layer].data.findIndex(item =>{
          if(item.goodsId == id){
            return true
          }
        })
        this.tableDataArr[layer].data.splice(index,1)

      },
```











# Math

Math.abs

```
toFixed(2)
```


# 为false情况

```
0、-0、null、""、false、undefined 或者 NaN，那么if判断 false ，其他为true  
```



# 获取当前时间格式化

```
getTime(){
       var date1=new Date();
       var year=date1.getFullYear();
       var month=date1.getMonth()+1;
       var day=date1.getDate();
       var hours=date1.getHours();
       var minutes=date1.getMinutes();
       var seconds=date1.getSeconds();
       return year+"年"+month+"月"+day+"日"+hours+":"+minutes+":"+seconds
     }
```



# js判断对象是否为空对象的几种方法

[js判断对象是否为空对象的几种方法](https://www.cnblogs.com/jpfss/p/9105119.html)



```
1.将json对象转化为json字符串，再判断该字符串是否为"{}"

var data = {};

var b = (JSON.stringify(data) == "{}");

alert(b);//true

4.Object.getOwnPropertyNames()方法

此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空

注意：此方法不兼容ie8，其余浏览器没有测试

var data = {};

var arr = Object.getOwnPropertyNames(data);

alert(arr.length == 0);//true

5.使用ES6的Object.keys()方法

与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组

var data = {};

var arr = Object.keys(data);

alert(arr.length == 0);//true
```



# JS合并两个数组的3种方法详解

[JS合并两个数组的3种方法详解]( https://www.jb51.net/article/172722.htm )

```js
var a = [1,2,3];
var b = [4,5,6];

1、concat
var c = a.concat(b); //c=[1,2,3,4,5,6];

2、for循环
大概的思路是：遍历其中一个数组，把该数组中的所有元素依次添加到另外一个数组中。
for( var i in b)
{
  a.push(b[i]);
}

3、apply
函数的apply方法有一个特性，那就是func.apply(obj,argv)，argv是一个数组。所以我们可以利用这点，直上代码：
a.push.apply(a,b);

调用a.push这个函数实例的apply方法，同时把，b当作参数传入，这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。

这里可能有点绕，我们可以把b看成[4,5,6]，变成这样：
a.push.apply(a,[4,5,6]);
然后上面的操作就等同于：
a.push(4,5,6);

```



# js过滤数组

```js
filterUserRights(state,data){
    let newArr = []
    let arr = data
    arr.map((item) => {
      if (item.checked) {
        let obj = {}
        obj.id = item.id
        obj.path = item.path
        obj.text = item.text
        obj.iconCls = item.iconCls
        obj.children = []
        if (item.children) {
          item.children.map((childItem) => {
            if (childItem.checked) {
              let newObj = {}
              newObj.id = childItem.id
              newObj.path = childItem.path
              newObj.text = childItem.text
              newObj.iconCls = childItem.iconCls
              newObj.children = []
              if(childItem.children){
                childItem.children.map((threeChildItem) => {
                  if(threeChildItem.checked){
                    let Obj3 = {}
                    Obj3.id = threeChildItem.id
                    Obj3.path = threeChildItem.path
                    Obj3.text = threeChildItem.text
                    Obj3.iconCls = threeChildItem.iconCls
                    newObj.children.push(Obj3)
                  }
                })
              }
              obj.children.push(newObj)
            }
          })
        }
        newArr.push(obj)
      }
    })
    state.filterUserRights = newArr
  },
```





# JavaScript防抖和节流

https://mp.weixin.qq.com/s/qyeRecCBBwa-Zf_V-KIRxA

```
防抖的应用场景很多：

输入框中频繁的输入内容，搜索或者提交信息；
频繁的点击按钮，触发某个事件；
监听浏览器滚动事件，完成某些特定操作；
用户缩放浏览器的resize事件；
密集的事件触发，我们只希望触发比较靠后发生的事件，就可以使用防抖函数


节流的应用场景：

监听页面的滚动事件；
鼠标移动事件；
用户频繁点击按钮操作；
游戏中的一些设计；
依然是密集的事件触发，但是这次密集事件触发的过程，不会等待最后一次才进行函数调用，而是会按照一定的频率进行调用
```



# 新建一个长度为100的数组, 并且每一项都是1

 https://blog.csdn.net/zdhanunity/article/details/95305737 

```

fill() 填充


let arr = []
arr.length = 100

// 或arr = Array(100)
arr.fill(1)


循环
let arr = []
for(let i = 0; i < 100; i++){
	arr[i] = 1
}
```



#  object.assign 

把两个对象合并为一个对象，属性相同的为后面的值

```js
object.assign(from,obj)------object.assign(目标对象,被合并的对象)

let obj1 = {name: 'xiaohong',age:'18'}
let obj2 = {name: 'zhaoming',sex:'fame'}

Object.assign(obj1,obj2)
console.log(obj1) //{ name: 'zhaoming', age: '18', sex: 'fame' }
```

