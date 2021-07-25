// import App from '../App.js'
import ListPage from '@/views/list.js'
import UploadPage from '@/views/upload.js'
import LoginPage from '@/views/login.js'
import RegisterPage from '@/views/register.js'
import WelcomePage from '@/views/welcome.js'
import MessagePage from '@/views/message.js'
import SettingPage from '@/views/setting.js'
import CodeImagePage from '@/views/code-img.js'

import MainLayout from '@/layout/index'
import FolderPage from '@/views/folder'

const routers = [
    {
        path: '/',
        exact: true,
        component: WelcomePage,
    },
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
        path: '/',
        component: MainLayout,
        children: [
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
            },
            {
                path: '/setting',
                exact: true,
                component: SettingPage
            },
            {
                path: '/code/img',
                exact: true,
                component: CodeImagePage
            },
            {
                path: '/folder/:key*',
                component: FolderPage
            }
        ]
    },
]

export default routers
