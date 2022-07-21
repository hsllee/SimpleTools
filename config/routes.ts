export default [
    {
        path: '/',
        redirect: '/score',
    },
    // {
    //     name: '首页',
    //     path: '/home',
    //     component: './index',
    // },
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
