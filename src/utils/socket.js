import socketIo from "socket.io-client"

const sock = socketIo("http://localhost:3000", {
    transports: ["websocket"]
})

export default sock