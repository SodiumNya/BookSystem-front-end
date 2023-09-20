// router/index.js
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: ()=> import("@/view/Layout.vue"),
        children: [
            {
                path: '',
                name: 'Home',
                component: ()=> import("@/view/UserView/Home.vue")
            },
            {
                path: 'bookList',
                name: 'book list',
                component: ()=>import("@/view/UserView/BookShelf.vue"),
                meta: {requireAuth: true}
            },
            {
                path: 'bookDetail/:bookId',
                name: 'bookDetail',
                component: ()=> import('@/view/UserView/BookDetail.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ()=> import("@/view/Profile.vue"),
                meta: {requireAuth: true}
            },
            {
                path: 'admin/UserManger',
                name: 'UserManger',
                component: () => import("@/view/AdminView/UserMangerView.vue"),
                meta: {requireAuth: true},
                beforeEach(to, from, next){
                    const user = JSON.parse(localStorage.getItem('user') || '{}')
                    if(!checkAdminAuthentication){
                        next('/login')
                    }
                    next();
                }
            },
            {
                path: 'admin/BookManger',
                name: 'BookManger',
                component: ()=> import('@/view/AdminView/BookManager.vue'),
                beforeEach(to, from, next){
                    const user = JSON.parse(localStorage.getItem('user') || '{}')
                    if(!checkAdminAuthentication){
                        next('/login')
                    }
                    next();
                }
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import("@/view/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: ()=> import("@/view/Register.vue")
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next)=>{
    if(to.meta.requireAuth){
        if(!checkAdminToken()){
            next('/login')
        }
        next();
    }else {
        next();
    }
})
function checkUserAuthentication(){
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user.token === '用户'

}
const checkAdminAuthentication = () =>{
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return (!user.token || user.role !== '管理员')
}

const checkAdminToken = () =>{
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return !!user.token
}
export default router;
