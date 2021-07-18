// import App from '../App.js'
import ListPage from '@/views/list.js'
import UploadPage from '@/views/upload.js'
import WelcomePage from '@/views/welcome.js'

const routers = [
    {
        path: '/',
        exact: true,
        component: WelcomePage
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
