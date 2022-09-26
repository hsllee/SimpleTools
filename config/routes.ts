export default [
    {
        path: '/',
        redirect: '/menu',
    },
    // {
    //     name: '首页',
    //     path: '/home',
    //     component: './index',
    // },
    {
        name: '菜单',
        path: '/menu',
        component: './menu',
    },
    {
        name: '计分',
        path: '/score',
        component: './score',
    },
    {
        path: '*',
        component: './404',
    },
];
