import React from 'react'
import { PageHeader, message, Badge } from 'antd';
import { AlignRightOutlined, LogoutOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import sock from '@/utils/socket.js'

class HeaderComponent extends React.Component {

    state = {
        badgeNum: 0
    }

    jump = () => {
        const { match } = this.props
        this.props.history.push({
            pathname: match.path === '/main' ? '/list' : '/main'
        })
    }

    toLogin = () => {
        this.props.history.push({
            pathname: '/login'
        })
    }

    render () {
        const { username } = this.props
        return (
            <PageHeader
                className="site-page-header"
                title="Introduction"
                extra={[
                    // <div key="1" className="icon-class">
                    //     {username}
                    // </div>,
                    // <Badge count={this.state.badgeNum} key="2">
                    //     <div className="icon-class" onClick={this.jump}>
                    //         <AlignRightOutlined />
                    //     </div>
                    // </Badge>,
                    // <Badge key="3" onClick={this.toLogin}>
                    //     <div className="icon-class">
                    //         <LogoutOutlined />
                    //     </div>
                    // </Badge>
                ]} />
        )
    }

    componentDidMount () {
        const { setUserName } = this.props
        setUserName(cookie.load('username'))

        sock.on('receive-someOneUploadFile', (data) => {
            console.log(data)
            const num = this.state.badgeNum + data.number
            this.setState({
                badgeNum: num
            })
            message.success('当前有新的文件已经被上传，可以点击查看')
        });
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserName: (username) => dispatch({ type: 'SET_USERNAME', payload: username })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
