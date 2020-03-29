import request from '../utils/request';


const host='http://127.0.0.1:9000';
// const host = 'http://47.106.12.217:39002';

export default {
  host
}
// 登录
// export const login = params => {return axios.post(url:'${host}/user/login/',params)};
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
