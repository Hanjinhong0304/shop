import axios from 'axios';
import { Message } from 'element-ui'; //  引入 element-ui  解构处理 Message 提示组件
const request = axios.create({
    timeout: 2000
});

// const errorTip={
//     "401":"没有权限",
//     "405":""
// }
// 请求之前拦截器
request.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            // 可以按照用户要求更改 标识  类似于 token
            authorization: window.sessionStorage.getItem('authorization')
        }
    }
}, (error) => {
    return Promise.reject(error)
})
// 相应之前
request.interceptors.response.use((response) => {
    let { code, msg } = response.data;
    if (code) {
        return response.data;
    }
    // 报错弹出信息
    Message({
        message: msg,
        type: 'error',
    });
    return Promise.reject(response.data)
}, (error) => {
    Message({
        message: error.response.data.msg || error.response.statusText,
        type: 'error',
    });
    return Promise.reject(error)
})

export {
    // 把 request 重命名为 axios
    request as axios
}

export default {
    install( Vue: { prototype: any; } ) {
        Object.defineProperty(Vue.prototype, "$http", {
            value: request
        })
    }
}