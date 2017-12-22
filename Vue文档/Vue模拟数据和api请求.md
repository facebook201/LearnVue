现在的前后分离开发模式。我们一般会自己mock server 来模拟需要的数据。 一般我会自己跟后端定义好JSON格式。 自己模拟一些数据 放在src目录下面的mock文件夹 以json的数据格式存放。 

>src
>
>​     mock
>
>​              goods.json // json数据



然后我将数据请求放在 api文件夹下面。 请求使用axios

> api
>
> ​      http       // axios的配置 
>
> ​      config   // 配置一些通用参数
>
> ​      common // 一些功能函数
>
> ​       getData //  获取数据
>
> 

### api/http

```javascript
// http.js

// 设置请求baseURL
axios.defaults.baseURL = '/api';

// 设置请求头
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function(data){
    let newData = '';
  	for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
  	return newData;
}];

// 带cookie请求
axios.defaults.withCredentials = true;

// get请求
function get(url) {
    return body => axios.get(url, {params: body })
}

// post 
function post(url) {
    return body => axios.post(url, body);
}

// 导出 
export const axios;
```







### api/config

```javascript
// 配置通用参数
export const commonParams = {
    g_tk: 12132,
    charset: 'utf-8'
};

export const options = {
    param: 'jsonpCallback'
};

// 配置请求路径url
export const API = 'http://192.168.4.157';

export const ERR_OK = 0;
```



### api/getData

```javascript
import axios from './http';

const fetch = (method, url, data) => {
    return axios({
       method: method,
       url: url,
       data: data
    });
};

// 导出请求函数 方便在具体的组件中 import使用 这里我模拟的json
export const userInfo = () => fetch{'get', 'src/mock/goods.json'};

// 以后更换成配置好的API
export const userInfo = () => fetch{'get', API + 'XXX'};

// 在具体的组件中我们可以这样使用
import { userInfo } from 'src/api/getData'; 
```

