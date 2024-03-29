import axios from 'axios'
import router from "@/router";

const request = axios.create({
    baseURL: 'http://localhost:9787/api',
    timeout: 5000
})


// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {

    if(!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    const userJson = JSON.parse(localStorage.getItem('user') || '{}')
    if (userJson) {
        // 设置请求头
        config.headers['token'] = userJson.token
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === 401) {
            router.push('/login').then(r => {
                console.info('登录权限过期,请重新登录')})
        }
        if(res.code === 404) {
            router.push('/404').then()
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request