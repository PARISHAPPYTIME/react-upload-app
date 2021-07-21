import { Input, Typography, Button, message } from 'antd'
import React from 'react';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { UserOutlined, EyeInvisibleOutlined, MehOutlined } from '@ant-design/icons'

const { Title } = Typography

class WelcomePage extends React.Component {

    state = {
        username: '',
        password: '',
        repassword: ''
    }

    handleChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassWord = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChangeRePassWord = (e) => {
        this.setState({
            repassword: e.target.value
        })
    }

    setData = () => {
        const { setUserName } = this.props
        setUserName(this.state.username)
    }

    setName = (value) => {
        this.setState({
            username: value
        })
    }

    save = () => {
        // cookie.save('username', this.state.username)
        // message.success(`欢迎 ${this.state.username} 使用软件`)
        // this.setData()
        // this.props.history.push({
        //     pathname: '/main'
        // })
    }

    render() {
        return (
            <div className="common-width">
                <Title>Introduction</Title>
                <Input prefix={<UserOutlined />} value={this.state.username} onChange={this.handleChangeUserName} size="large" placeholder="username" />
                <Input prefix={<EyeInvisibleOutlined />} value={this.state.password} onChange={this.handleChangePassWord} size="large" placeholder="password" />
                <Input prefix={<MehOutlined />} value={this.state.repassword} onChange={this.handleChangeRePassWord} size="large" placeholder="Enter your password again" />
                <div className="w-btn">
                    <Button onClick={this.save} type="primary" block>保存用户名称</Button>
                </div>
            </div>
        )
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

// mapStateToProps、mapDispatchToProps、mergeProps和options
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
