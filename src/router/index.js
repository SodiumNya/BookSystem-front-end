// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Layout',
        component: import("@/view/Layout.vue"),
        children: [
            {
                path: '',
                name: 'Home',
                component: import("@/view/Home.vue")
            },
            {
                path: 'bookList',
                name: 'book list',
                component: import("@/view/BookShelf.vue"),
                meta: {requireAuth: true}
            },
            {
                path: 'bookDetail/:bookId',
                name: 'bookDetail',
                component: import('@/view/BookDetail.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: import("@/view/Profile.vue"),
                meta: {requireAuth: true}
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: import("@/view/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: import("@/view/Register.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next)=>{
    if(to.meta.requireAuth){
        const isAuthenticated = checkUserAuthentication();
        if(isAuthenticated){
            next();
        }else {
            next('/login');
        }
    }else {
        next();
    }
})
function checkUserAuthentication(){
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return !!user.token;



}
export default router;
