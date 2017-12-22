#### 1 带cookie请求

Axios 默认是请求的时候不带上cookie的。 需要通过设置 withCredentials: true来解决。



#### 2  使用post请求的时候发送的formdata格式数据

* 首先设置请求头 发送之前做一些数据处理

  ```javascript
  axios.defaults.headers['Content-Type'] = 'application/json';

  // 发送http请求之前参数处理
  axios.interceptors.request.use(
    (config) => {
      const cfg = config;
      const token = cookie.get('token');
      cfg.headers.token = token || 'TOKEN IS UNDEFINED';
      // console.log('请求接口地址', cfg.url);
      // console.log('请求接口数据:', cfg.data);
      return cfg;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    },
  );

  // 发送http请求之后参数处理
  axios.interceptors.response.use(
    (response) => {
      const res = response;
      return res;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    },
  );

  ```

  ​

  ​

