import socketIo from "socket.io-client"
import { baseUrl } from '@/utils/baseUrl.js'

const sock = socketIo(baseUrl, {
    transports: ["websocket"]
})

export default sock