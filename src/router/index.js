import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name:'index'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '系统首页' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/projectslist',
                    component: () => import('../components/page/projectMessage/project.vue'),
                    meta: { title: '项目列表' }
                },

                {
                    path: '/apiMessage',
                    component: () => import('../components/page/apiMessage/apiMsg.vue'),
                    meta: { title: '接口管理' }
                },
                                {
                    path: '/caseMessage',
                    component: () => import('../components/page/caseManage/case.vue'),
                    meta: { title: '用例管理' }
                },
                {
                    path: '/envMessage',
                    component: () => import('../components/page/env/Envs.vue'),
                    meta: { title: '环境管理' }
                },





                {
                    path: '/projectadd',
                    component: () => import('../components/page/projectMessage/ProjectAdd.vue'),
                    meta: { title: '项目新增' }
                },
                {
                    path: '/envslist',
                    component: () => import('../components/page/EnvsList'),
                    meta: { title: '环境列表' }
                },
                {
                    path: '/envsadd',
                    component: () => import('../components/page/EnvsAdd'),
                    meta: { title: '新增环境' }
                },
                {
                    path: '/debugtalkslist',
                    component: () => import('../components/page/DebugtalksList'),
                    meta: { title: '函数列表' }
                },
                {
                    path: '/debugtalk',
                    component: () => import('../components/page/debugtalk'),
                    meta: { title: '函数列表' }
                },
                {
                    path: '/debugtalkedit',
                    component: () => import('../components/page/DebugtalkEdit'),
                    meta: { title: '函数修改' }
                },
                {
                    path: '/testcaseslist',
                    component: () => import('../components/page/TestcasesList'),
                    meta: { title: '用例列表' }
                },{
                    path: '/testcasesadd',
                    component: () => import('../components/page/TestcasesAdd'),
                    meta: { title: '新增用例' }
                },
                {
                    path: '/configurslist',
                    component: () => import('../components/page/ConfiguresList'),
                    meta: { title: '配置列表' }
                },
                {
                    path: '/configuresedit',
                    component: () => import('../components/page/ConfiguresEdit'),
                    meta: { title: '配置修改' }
                },
                {
                    path: '/testsuitslist',
                    component: () => import('../components/page/TestsuitsList'),
                    meta: { title: '套件列表' }
                },








                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../components/page/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
