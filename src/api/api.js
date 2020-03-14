import axios from 'axios';

const host = 'http://127.0.0.1:9000';

export const login = params => {return axios.post('${host}/user/login/',params)};


export const addproject = params => {return axios.post('${host}/projects/',params)};

export const get_projects = () => {return axios.get('${host}/projects/')};








const addprojects = host+'/projects/';
const findProApi = host+'/projects/';
const editProApi = host+'/projects/';
const getOneProApi = host+'/projects/';
const delProApi = host+'/projects/';



// 模块
const getModules = host+'/modules/';


export default {
    addprojects,
    findProApi,
    editProApi,
    getOneProApi,
    delProApi,

}