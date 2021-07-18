import { Input, Typography, Button, message } from 'antd'
import React from 'react';
import cookie from 'react-cookies'
import { connect } from 'react-redux'

const { Title } = Typography

class WelcomePage extends React.Component {

    state = {
        username: ''
    }

    handleChange = (e) => {
        this.setName(e.target.value)
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

    handleUpload = () => {
        cookie.save('username', this.state.username)
        message.success(`欢迎 ${this.state.username} 使用软件`)
        this.setData()
        this.props.history.push({
            pathname: '/main'
        })
    }

    render() {
        return (
            <div className="common-width">
                <Title>Introduction</Title>
                <Input value={this.state.username} onChange={this.handleChange} size="large" placeholder="请输入你的名字" />
                <div className="w-btn">
                    <Button onClick={this.handleUpload} type="primary" block>保存用户名称</Button>
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
