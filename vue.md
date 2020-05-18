# 生命周期

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png) 





# mock.js使用

链接  基本使用<https://www.jianshu.com/p/f3adb1aab09e> 

用mock.js做分页 <https://www.jianshu.com/p/348a26493eef> 

1npm install mockjs --save-dev 

2在项目中创建mock.js，并写一个简单的返回示例，后面拦截其他url的ajax请求直接参考这个示例。

```
//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/\/api\/msdk\/proxy\/query_common_credit/', {
    "ret":0,
    "data":
      {
        "mtime": "@datetime",//随机生成日期时间
        "score|1-800": 800,//随机生成1-800的数字
        "rank|1-100":  100,//随机生成1-100的数字
        "stars|1-5": 5,//随机生成1-5的数字
        "nickname": "@cname",//随机生成中文名字
      }
//data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
});
```

或者创建一个mock文件夹，在文件夹下创建data.json和mockServe.js

```
data.js
{
    type：[],
    goods:{}
}

mockServe.js
/**
 * 使用mockjs提交模拟接口
 */
import apiData from './data.json'
import Mock from 'mockjs'
// 注册路由
Mock.mock('/api/type', {code: 0, data: apiData.type} )
Mock.mock('/api2/goods', {code: 0, data: apiData.goods} )

// 不需要向外暴露什么

```

3在main.js中引入

```
import './mock/mockServer'
```

4xxx.vue文件中调用mock.js中模拟的数据接口，这时返回的response就是mock.js中用Mock.mock(‘url’,data）中设置的data了。

```
query_common_credit(){
      var loginMode = 'msdk';//游戏内默认msdk(wx|qq|msdk)
      var url = '/api/type';
      this.$axios.get(url)
        .then(response => {
          
        })
        .catch(error => {
          
        })
    }
```



设置延时请求到数据

不设置延时很有可能遇到坑，这里需要留意，因为真实的请求是需要时间的，mock不设置延时则是马上拿到数据返回，这两个情况不同可能导致在接口联调时出现问题。所以最好要先设置延时请求到数据。

```
//延时400s请求到数据
Mock.setup({
    timeout: 400
})
//延时200-600毫秒请求到数据
Mock.setup({
    timeout: '200-600'
})
```



# 模板语法



## 文本

```
<span>Message: {{ msg }}</span>
```



## 使用js表达式

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。

```
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```



## 指令

带v-前缀

v-if，v-show，v-for（带上key）

v-bind： 简写：   v-on： 简写@



### 修饰符

带.

```
<form @submit.prevent="onSubmit">...</form>
```





# 计算属性computed和监听属性watch

## 计算属性vs方法

方法：

```
<p>Reversed message: "{{ reversedMessage() }}"</p>
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数 

每当触发重新渲染时，调用方法将**总会**再次执行函数。 



## 计算属性为什么要缓存

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A** 。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。 



## 计算属性和setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。



## 监听器watch

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。 



# 传递参数

## 组件传参

```
详细说明链接 https://www.cnblogs.com/barryzhang/p/10566515.html
```



### 方式一：父传子props接受

**父组件的代码：** 

```javascript

<template>
    <Child :msg="text"></Child> //传递参数
</template>
<script>
import Child from "@/components/Child"; //引入子组件
export default {
  data() {
    return {
      text: "父组件的值" //传入子组件的值
    };
  },
  methods: {
    dataChange(data){
        this.msg = data
    }
  },
  components: { //暴露子组件
    Child
  }
};
</script>
<style scoped>
</style>
```

**子组件的代码** 

```javascript
<template>
    <div id="container">
        {{msg}}
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:{ //props接受
    msg: String
  }
};
</script>
<style scoped>
#container{
    color: red;
    margin-top: 50px;
}
</style>
```



#### **props类型**

1以数组字符窜形式   props: ['title', 'likes', 'isPublished', 'commentIds', 'author'] 

2对象形式  ：限定类型

```
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```



#### 传递动静态prop

```
//静态
<blog-post title="My journey with Vue"></blog-post>

//动态
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```



#### prop验证

```
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```



#### 类型检查

```
type 可以是下列原生构造函数中的一个：

String
Number
Boolean
Array
Object
Date
Function
Symbol
额外的，type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认。例如，给定下列现成的构造函数：

function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
你可以使用：

Vue.component('blog-post', {
  props: {
    author: Person
  }
})
来验证 author prop 的值是否是通过 new Person 创建的。
```



### 方式二:子传父

**子组件代码：** 

```
<template>
    <div id="container">
        <input type="text" v-model="msg">
        <button @click="setData">传递到父组件</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "传递给父组件的值"
    };
  },
  methods: {
    setData() {
      this.$emit("getData", this.msg);
    }
  }
};
</script>
<style scoped>
#container {
  color: red;
  margin-top: 50px;
}
</style>
```

**父组件代码**

```
<template>
    <div id="container">
        <Child @getData="getData"></Child>
        <p>{{msg}}</p>
    </div>
</template>
<script>
import Child from "@/components/Child";
export default {
  data() {
    return {
      msg: "父组件默认值"
    };
  },
  methods: {
    getData(data) {
      this.msg = data;
    }
  },
  components: {
    Child
  }
};
</script>
<style scoped>
</style>
```



### 方式三：vuex

**在main.js中**

```
import store from './store' //引入vuex
new Vue({
  router,
  store,  //渲染store
  // components: {Loading},
  render: h => h(App)
}).$mount('#app')
```

**创建store.js**

```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        invoice_info: {}, //订单发票
    },
    getters:{
        getUserInfo(state) {
      return state.invoice_info
    }
    },
    mutations:{
       getOrderInvoiceInfo(state, data) {
      state.invoice_info = data
    }
    },
    actions:{
        async getOrderInvoiceInfo({commit}) {
      let res = await getOrderViewInfo()
      if (res.data.status === 200) {
        commit('getOrderInvoiceInfo', res.data.data.invoice_info)
      }
    },
    }
})
```

**在组件中调用**

```
this.$store.state.invoice_info
this.$store.getters.getUserInfo
this.$store.commit('getOrderInvoiceInfo',data)
this.$store.dispatch('getOrderInvoiceInfo')
```



## 路由传参

### 方案一${id}

```
 getDescribe(id) {
//   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/describe/${id}`,
        })
```

方案一，需要对应路由配置如下：

```
   {
     path: '/describe/:id',
     name: 'Describe',
     component: Describe
   }
```

很显然，需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值。

```
this.$route.params.id
```

### 方案二：params

父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。

```
       this.$router.push({
          name: 'Describe',
          params: {
            id: id
          }
        })
```

对应路由配置: 这里可以添加:/id 也可以不添加，不添加数据会在url后面显示，不添加数据就不会显示

```
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```

子组件中: 这样来获取参数

```
this.$route.params.id
```

### 方案三：query

父组件：使用path来匹配路由，然后通过query来传递参数
这种情况下 query传递的参数会显示在url后面?id=？

```
    this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })
```

对应路由配置：

```
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```

对应子组件: 这样来获取参数

```
this.$route.query.id
```



# class和style

## 实例

```
style三元表达式
<p :style="{'color': (checkIndex3==m.txt ? '#3d8cff':'#BBBBBB')}">{{m.txt}}</p>
 

 class三元表达式
<i class="iconfont "  :class="[isShow=='password'?'icon-kejian':'icon-bukejian']"></i>
```



## class普通动态绑定

```
绑定数据可以为基本数据，对象，计算属性

绑定对象
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}

结果渲染为：
<div class="static active"></div>

绑定计算属性
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

```



## class绑定对象语法

```
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

data: {
  isActive: true,
  hasError: false
}

结果渲染为：
<div class="static active"></div>
```



## class绑定数组语法

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```
<div v-bind:class="[activeClass, errorClass]"></div>
```

```
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 truthy[[1\]](https://cn.vuejs.org/v2/guide/class-and-style.html#footnote-1) 时才添加 `activeClass`。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```



## style基本动态绑定

```
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```



## style绑定对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```



## style绑定数组语法

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```



**自动添加前缀**

当 `v-bind:style` 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。



# 组件

## 封装组件子传父数据

子组件：

```
<template>

    <div class="app">

       <input @click="sendMsg" type="button" value="给父组件传递值">

    </div>

</template>

<script>

export default {

    data () {

        return {

            //将msg传递给父组件

            msg: "我是子组件的msg",

        }

    },

     methods:{

         sendMsg(){

             //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据

             this.$emit('func',this.msg)

         }

     }

}

</script>

```


子组件通过this.$emit()的方式将值传递给父组件

注意：这里的func是父组件中绑定的函数名

父组件：

```
<template>

    <div class="app">

        <child @func="getMsgFormSon"></child>

    </div>

</template>

<script>

import child from './child.vue'

export default {

    data () {

        return {

            msgFormSon: "this is msg"

        }

    },

    components:{

        child,

    },

    methods:{

            getMsgFormSon(data){

                this.msgFormSon = data

                console.log(this.msgFormSon)

            }

    }

}

</script>

```



# filter过滤器的使用

## filter使用

`Vue.js` 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：`双花括号插值`和 `v-bind 表达式` (后者从` 2.1.0+` 开始支持)。过滤器应该被添加在 `JavaScript` 表达式的尾部，由“管道”符号指示：

```
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

## 组件中定义过滤器

你可以在一个组件的选项中定义本地的过滤器：
如下：
html代码：

```
<div id="app">
 <input type="text" v-model="message" />
 {{message | capitalize }}
</div>
```

JS代码：

```
var vm=new Vue({
    el:"#app",
    data:{
        message:''
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
})
```

## 全局定义过滤器

```
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到` message `的值作为第一个参数。

## Vue.filter()

语法：`Vue.filter( id, [definition] )`
参数：

- `{string} id`
- `{Function} [definition]`

用法：注册或获取全局过滤器。

```
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

## 串联过滤器

```
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数` filterB`，将 `filterA `的结果传递到 `filterB `中。

过滤器是 JavaScript 函数，因此可以接收参数：

```
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收`三个参数`的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1' `作为第二个参数，表达式` arg2` 的值作为第三个参数。

## 创建文件夹的全局过滤器

```
新建filters/index.js
/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

在main.js中引入和注册全局过滤器

import * as filters from '../filters/index'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
此时就可以在不同的.vue中使用定义的全局过滤器了

{{date|isNullOrEmpty}}是否为空<br/>
        {{date|timeFormat('yyyy-mm-dd')}} 时间过滤器<br>
        {{date|timeFormat('yyyy-mm')}} 时间过滤器yyyy-mm<br>
        {{date|timeFormat('hh:mm')}} 时间过滤器hh:mm<br>
        {{date|timeFormat('yyyy')}} 时间过滤器yyyy<br>
     {{date|timeFormat}} 时间过滤器yyyy<br>
```



# 指令

<https://cn.vuejs.org/v2/guide/custom-directive.html> 

**在vue.js官网查找自定义指令**

## 注册局部指令

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

## 注册全局指令

```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

## 创建文件夹注册全局指令

> 全局定义指令：我们现在src目录下新建directive文件夹，在其中新建focus.js的文件 

- 第一步： 编写focus.js的内容

```
import Vue from 'vue'

/** 全局注册*/
Vue.directive('focus',{
  /**
   * 当被绑定元素插入到DOM时 */
  inserted(e) {
    e.focus()
  }
})
```

- 第二步：在main.js中注册

```
import './directives/focus'
```

- 第三步： 在template中引用

```
<h2>自定义指令</h2>
<input type="text" v-focus>
```

#  vue数据重置

**使用Object.assign()**

MDN关于该方法的介绍：Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
用法： Object.assign(target, ...sources)
第一个参数是目标对象，第二个参数是源对象，就是将源对象属性复制到目标对象，返回目标对象

其中就是将一个对象的属性copy到另一个对象

vue中：
this.$data 获取当前状态下的data
this.$options.data() 获取该组件初始状态下的data

所以，下面就可以将初始状态的data复制到当前状态的data，实现重置效果：

```
Object.assign(this.$data,this.$options.data()) 
```

当然，**如果你只想重置data中的某一个对象或者属性**：

```
this.form = this.$options.data().form
```


**扩展**
Object.assign(target, ...sources) 方法还可以用来合并对象：

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };
const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

如果对象中含有相同属性，取最后一个属性：

```
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };
const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 } 属性取最后一个对象的属性
```



# vuex

## vuex数据保存和重置

**保存**

```vue
在app.vue中
created () {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }

      //在页面刷新前有token将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        if(sessionStorage.getItem("token")){
          sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        }
      })
    }
```

**重置**

```vue
在login.vue中要将vuex重置
<template>
  <div v-if="isReload">
    登录页面
  </div>
</template>
data() {
    return {
      isReload: false,
    }
  },
created(){
    //重置vuex中数据
    this.isReload = false
    if (this.$store.state.userRight.userRights.length > 0){
      window.location.reload()
    }else{
      this.isReload = true
    }
  },
```



## vuex的使用

**modules**

1. home.js 一些公共数据
2. userRight.js 用户权限相关

**index.js**

已经实现自动化，无需引入模块

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

export default store

/* import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import userRight from './modules/userRight'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    userRight,
  }
}) */
```



**注意点**

每个模块必须添加namespaced: true,

```js
export default {
  namespaced: true,//为了解决不同模块命名冲突的问题
  state,
  mutations,
  actions
}
```



在组件中的使用

```js
//数据要在计算属性中
computed: {
      isCollapse() {
        return this.$store.state.home.isCollapse
      },
      navData(){ //导航栏数据
        return this.$store.state.userRight.filterUserRights
      },
    },
 
//commit和dispatch前要带对应模块名，为防止重名
this.$store.commit('userRight/employeeId',employeeId)
this.$store.dispatch('userRight/navigateTreeDetailVueApi')
```



# vue页面刷新

当我们在做项目时，我们需要做当前页面的刷新来达到数据更新的目的，在此我们大概总结了几种常用的页面刷新的方法。

## 1window.location.reload()，this.$router.go(0)

1.window.location.reload(),是原生JS提供的方法，this.$router.go(0):是vue路由里面的一种方法，这两种方法都可以达到页面刷新的目的，简单粗暴，但是用户体验不好，相当于按F5刷新页面，会有短暂的白屏，相当于页面的重新载入。

## 2通过路由跳转的方法刷新

具体思路是点击按钮跳转一个空白页，然后再马上跳回来：

当前页面：

```vue
<template>

	<div>

	<el-button type="primary" class="btn" @click="btnaction">摁我刷新页面</el-button>

	</div>

</template>

<script>

	export default{

		data(){

			return{

			}

		},

		mounted(){

		},

		methods:{

			btnaction() {

//				location.reload()

//              this.$router.go(0)

                this.$router.replace({

                	path:'/empty',

                	name:'empty'

                })

			}

		}

	}

</script>

```


空白页面：

```
<template>

	<h1>

		空页面

	</h1>

</template>

<script>

	export default{

		data() {

			return{

				

    		}
    	},
    	created(){
    		this.$router.replace({
                	path:'/',
                	name:'father'
                })
    	}
    }
    

</script>

```


当点击按钮时地址栏会有快速的地址切换过程。

## 3.控制router-view的显示与否

在全局组件注册一个方法，该方法控制router-view的显示与否，在子组件调用即可：

APP.vue

```vue
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() { // 注册一个方法
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    },
}
</script>

```


当前组件：

```vue
<template>
	<div>
		<el-button type="primary" class="btn" @click="btnaction">摁我刷新页面</el-button>
	</div>
</template>
<script>
	export default{
		inject: ['reload'], // 引入方法
		data(){
			return{
			}
		},
		components:{
		},
		mounted(){
		},
		methods:{
			btnaction() {
                this.reload() // 调用方法
			}
		}
	}

</script>

```


当点击按钮时所有页面重新渲染。

## 4.对列表操作后的表格刷新的操作方法

重新请求接口就行





# vue数组改变不更新页面

[vue 数组对象改变了页面显示没有刷新问题](<https://blog.csdn.net/sunzbking/article/details/86150365> )

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：

```
// Vue.set

Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice

vm.items.splice(indexOfItem, 1, newValue)

你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：

vm.$set(vm.items, indexOfItem, newValue)

为了解决第二类问题，你可以使用 splice：

vm.items.splice(newLength)

```





# vue中杂项处理

## 禁止显示上下箭头，禁止鼠标滚轮事件

> 使用下面css即可禁止显示上下箭头

```
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
   margin: 0;
}
input[type="number"]{
  -moz-appearance:textfield;
}
</style>
使用element-ui+vue时，在el-input加上@mousewheel.native.prevent来阻止鼠标滚动

<el-input type="number" @mousewheel.native.prevent />
```

```
<body> 
    <input type="number" name="mouse1" id="mouse1"> 
    <!-- 禁止谷歌浏览器、Opera浏览器以及360浏览器等采用谷歌内核的浏览器 --> 
    <input type="number" name="mouse2" id="mouse2" onmousewheel="return false;">
    <!-- 禁止Firefox浏览器 --> 
    <input type="number" name="mouse3" id="mouse3">
    <script> 
         $("#mouse3")[0].addEventListener('DOMMouseScroll', MouseWheel, false);
        function MouseWheel(event) { 
             event = event || window.event; event.preventDefault(); 
         } 
    </script> 
</body> 
```





# JS/Vue动态获取浏览器高度

 https://blog.csdn.net/jeremyjone/article/details/98958323 



# Vue.js动态获取浏览器高度并进行实时修改DOM元素高度

 https://blog.csdn.net/xuquanxi1079/article/details/83008749?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase 



ps：喜带后台 systemSettings(系统设置)/roleManage角色管理中有使用

```
<template>

    <div class="content" :style="contentStyleObj"></div>

</template>

<script>

export default {
  name: 'App',
  data () {
　　return {
      contentStyleObj:{
　　　　　　height:''
　　　　}
　　}
  },
  components:{
  },

  methods:{
    getHeight(){
      this.contentStyleObj.height=window.innerHeight-70+'px';
    }
  },

  created(){
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
  },

  destroyed(){
    window.removeEventListener('resize', this.getHeight)
  }
}

</script>
```

