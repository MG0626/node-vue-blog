import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.0.107:3000/api',
  timeout: 5000
});

// http.interceptors.request.use(config => {
//   return config;
// })

http.interceptors.response.use(res => {
  return res;
}, err => {
  // 对响应错误做些什么
  return err.response;
});



export default http;