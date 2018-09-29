import axios from 'axios';
import QS from 'qs';
import { Toast } from 'vant';

// 环境的切换

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = ''; // 开发
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = ''; // 测试
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = ''; // 生产环境
}
// 请求超时 3S
axios.defaults.timeout = 3000;
// POST 请求头的设置 为什么请求头要设置请求头 application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 拦截器
// 导入Vuex 需要里面的状态
import store from '@/store/index';
axios.interceptors.request.use(
    config => {​ // 发送之前判断Vuex中是否存在token 如果存在统一在header加上token
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    }, error => {
        return Promise.error(error);
    });

// 响应的拦截
axios.interceptors.response.use(
    response => {​ // 如果返回200 请求成功
        if (response.status === 200) {​
            return Promise.resolve(response);​
        } else {​
            return Promise.reject(response);​
        }
    },
    // 相关状态码
    error => {
        if (error.response.status) {​
            switch (error.response.status) {​ // 401 未登录
                case 401:
                    ​router.replace({​ path: '/login', ​query: {​ redirect: router.currentRoute.fullpath​ }​ });
                    break;​
                case 403:
                    ​Toast({​
                        message: '登录过期, 请重新登录',
                        ​duration: 3000,
                        ​forbidClick: true
                    });​ // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);​ // 跳转登录页面 将浏览的页面fullPath传过去 登录成功之后跳转访问的页面                    ​
                    setTimeout(() => {​
                        router.replace({​
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullpath​
                            }​
                        });​
                    }, 1000);
                    break;​
                case 404:
                    ​Toast({
                        message: '请求不存在',
                        duration: 1500,
                        ​forbidClick: true​
                    });​
                    break;
                default:
                    ​Toast({
                        message: error.response.data.message,
                        ​duration: 1500,
                        ​forbidClick: true​
                    });​
            }
            return Promise.reject(error.response);
        }
    }
)

// 封装请求方法
/**
 * get
 * @param {String} url 请求地址
 * @param {Object} params 请求携带的参数
 */
export function getMethod(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {​ params: params​ }).then(res => {​ resolve(res.data);​ }).catch(err => {​ reject(err.data);​ })
    });
}
/**
 * post
 */
export function postMethod(url, params) {
    return new Promise((reslove, reject) => {​
        axios.post(url, QS.stringify(params)).then(res => {​ resolve(res.data);​ }).catch(err => {​ reject(err.data);​ })
    });
}

// api 接口管理
import { getMethod, postMethod } from './http';
// 假如接口地址是 http://www.baidu.com/api/v1/address
// 请求地址接口
export const Address = param = post('/api/v1/address', p);
// 使用的时候 在组件里面引入
import { Address } from '@/request/api';
export default {
    name: 'address',
    created() {
        this.onLoad();
    },
    methods: {
        // 获取地址数据
        onLoad() {
            Address({
                type: 0,
                sort: 1
            }).then(res => {
                if (res.code === ERR_OK) {
                    // 成功的操作
                }
            });
        }
    }
};
