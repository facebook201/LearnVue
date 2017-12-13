import axios from 'axios';
// import cookie from 'cookies-js';

axios.defaults.timeout = 3000;

axios.defaults.headers.post['Content-Type'] = 'application/json';
// 发送http请求之前参数处理
axios.interceptors.request.use(
  (config) => {
    const cfg = config;
    // const token = cookie.get('token');
    // cfg.headers.token = token || 'TOKEN IS UNDEFINED';
    // console.log('请求接口地址', cfg.url);
    // console.log('请求接口数据:', cfg.data);
    return cfg;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
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
  }
);

export default axios;
