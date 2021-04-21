import axios from 'axios';

// export default function request(config) {
//   const instace = axios.create({
//     baseURL: 'http://localhost:3000/admin',
//     timeout: 5000
//   })
//   instace.interceptors.response.use(
//     res => {
//       return res.data
//     }
//   )

//   return instace(config)
// }

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin',
  // baseURL: 'http://localhost:3000/admin',
  timeout: 5000
});

console.log(process.env);

http.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + window.localStorage.getItem('token');
  return config;
})

http.interceptors.response.use(res => {
  return res;
}, err => {
  // 对响应错误做些什么
  return err.response;
});



export default http;