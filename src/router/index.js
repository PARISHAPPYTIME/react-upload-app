// import App from '../App.js'
import ListPage from '@/views/list.js'
import UploadPage from '@/views/upload.js'
import LoginPage from '@/views/login.js'
import RegisterPage from '@/views/register.js'
import WelcomePage from '@/views/welcome.js'
import MessagePage from '@/views/message.js'

import MainLayout from '@/layout/index'

const routers = [
    {
        path: '/',
        exact: true,
        component: WelcomePage,
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/login',
                exact: true,
                component: LoginPage,
            },

            {
                path: '/register',
                exact: true,
                component: RegisterPage
            },
            {
                path: '/list',
                exact: true,
                component: ListPage
            },
            {
                path: '/main',
                exact: true,
                component: UploadPage
            },
            {
                path: '/message',
                exact: true,
                component: MessagePage
            }
        ]
    },
]

export default routers
