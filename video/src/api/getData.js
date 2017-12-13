import axios from './http';

const fetch = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data
  });
};

// 获取个人信息
export const userInfo = () => fetch('get', 'src/mock/goods.json');
