import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Blank.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },         
                {
                    path: '/userCenter',
                    component: resolve => require(['../components/page/UserCenter.vue'], resolve)    // 拖拽列表组件 
                },
                {
                    path: '/modifyUser',
                    component: resolve => require(['../components/page/ModifyUser.vue'], resolve)
                },
                {
                    path: '/modifyPassword',
                    component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
                },
                {
                    path: '/success',
                    component: resolve => require(['../components/page/Success.vue'], resolve)
                },
                {
                    path: '/assignStudents',
                    component: resolve => require(['../components/page/AssignStudents.vue'], resolve)
                },
                {
                    path: '/studentList',
                    component: resolve => require(['../components/page/studentList.vue'], resolve)
                },
                {
                    path: '/grade',
                    component: resolve => require(['../components/page/Grade.vue'], resolve)
                },
                {
                    path: '/reportSubmit',
                    component: resolve => require(['../components/page/reportSubmit.vue'], resolve)
                }
            ]
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/register-success',
            component: resolve => require(['../components/page/RegisterSuccess.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
