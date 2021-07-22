// import App from '../App.js'
import ListPage from '@/views/list.js'
import UploadPage from '@/views/upload.js'
import LoginPage from '@/views/login.js'
import RegisterPage from '@/views/register.js'

const routers = [
    {
        path: '/',
        exact: true,
        component: LoginPage
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage
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
    }
]

export default routers
