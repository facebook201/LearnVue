import axios from 'axios';
// import store from '../store';
// improt { getToken }
// 权限相关getToken 还有保存一些token在store里面

const baseUrl = 'http://api.hyyxedu.com';

const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 5000, // 请求时间
});

// 拦截器相关的代码
export default service;
