import React from 'react'
import { message, PageHeader } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons'
// import SockJs from "sockjs-client"
// const sock = new SockJs('http://localhost:3000', { transports: ['websocket'] })

import sock from '../utils/socket.js'

class HeaderComponent extends React.Component {

    jump = () => {
        console.log(this.props)
        const { match } = this.props
        if (match.path === '/main') {
            this.props.history.push({
                pathname: '/list'
            })
        } else {
            this.props.history.push({
                pathname: '/main'
            })
        }

    }

    render () {
        return (
            <PageHeader
                ghost={false}
                title="Introduction"
                subTitle="yxswy"
                extra={[
                    <AlignRightOutlined key="1" onClick={this.jump} />
                ]} />
        )
    }

    componentDidMount() {
        sock.on('login', (data) => {
            message.success('登录部分 => ' + data)
        });
        sock.on('user', (data) => {
            message.success('用户 => ' + data)
        });
        sock.on('message', (data) => {
            message.success('我收到了消息 => ' + data)
        });

        // setTimeout(() => {
        //     console.log('test1')
        //     sock.emit('events', {
        //         name: '王丽娟',
        //         message: '我真的好想和你在一起'
        //     })
        // }, 5000)
    }
}

export default HeaderComponent
