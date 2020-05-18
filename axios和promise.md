# 调用接口模板

```
import { exceptionRanking } from "../../api/index";

async exceptionRankingApi(){
        let params = {
          
        }
        let res = await exceptionRanking(params);
        try{
          if(res.data.status == 200) {

          } else {

          }
        }catch (error) {

        }
      },
```



# 封装get和post的区别

```
//post
axios.post( '连接地址 path和query参数直接放里面', '是作为请求主体被发送的数据 body参数', {
    timeout: 1000,
    headers: 'object 发送的自定义请求头'
})


export const getSendCodeNumber = params => {
    return axios.post('miscellaneous/getSendCodeNumber', params).then(data => data)
}

//get
axios.get('/user', {
params: {
ID: 12345
}
})

export const exceptionRanking = params => {
  return axios.get('TaolinDeviceException/exceptionRanking', {params}).then(data => data)
}
```

