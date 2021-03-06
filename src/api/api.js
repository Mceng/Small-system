import axios from 'axios';

const host = 'http://127.0.0.1:9000';
// const host = 'http://47.106.12.217:39002';



// export const login = params => {return axios.post('${host}/user/login/',params)};
//
//
// export const addproject = params => {return axios.post('${host}/projects/',params)};
//
// export const get_projects = () => {return axios.get('${host}/projects/')};


const Login = host+'/user/login/';


// 公共
const getProName = host+'/projects/names/';


// 项目


const ProjectsApi = host+'/projects/';
const addprojects = host+'/projects/';
const findProApi = host+'/projects/';
const editProApi = host+'/projects/';
const getOneProApi = host+'/projects/';
const delProApi = host+'/projects/';



const Testsuits = host+'/testsuits/';


const Testcases = host+'/testcases/';



// 模块/projects/5/modules/
const getModules = host+'/projects/';

const Modules = host+'/modules/';

const addModules = host+'/modules/';
const delModule = host+'/modules/';
const getModule = host+'/modules/';
const putModule = host+'/modules/';


const Debugtalk = host+'/debugtalks/';

const Envs = host+'/envs/';


const Reports = host+'/reports/';







// 接口interfaces
const InterfaceApi = host+'/interfaces/';


export default {
    host,
    Login,
    ProjectsApi,
    getProName,
    addprojects,
    findProApi,
    editProApi,
    getOneProApi,
    delProApi,
    getModules,
    addModules,
    delModule,
    getModule,
    putModule,
    Modules,
    InterfaceApi,
    Debugtalk,
    Envs,
    Testsuits,
    Testcases,
    Reports,

}