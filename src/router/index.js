// import App from '../App.js'
import ListPage from '../list.js'
import UploadPage from '../upload.js'

const routers = [
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
