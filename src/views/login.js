import { Input, Typography, Button, Form, Checkbox } from 'antd'
import React from 'react';
import { connect } from 'react-redux'
import server from '@/utils/request.js'
import cookie from 'react-cookies'

const { Title } = Typography

class LoginPage extends React.Component {
    onFinish = (form) => {
        server({
            url: '/user/login',
            method: 'POST',
            data: form
        }).then(res => {
            const { code, data } = res
            if (code === 200) {
                cookie.save('token', data.token)
                this.props.history.push({
                    pathname: '/main'
                })
            }
        })
    };

    onFinishFailed = (errorInfo) => { };

    toRegister = () => {
        this.props.history.push({
            pathname: '/register'
        })
    }

    render() {
        return (
            <div className="common-width">
                <Title>Login</Title>
                <Form
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input size="large" placeholder="Username or email address" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' }
                        ]}>
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item className="w-btn">
                        <Button type="primary" block htmlType="submit">登录</Button>
                    </Form.Item>
                    <Button type="link" onClick={this.toRegister}>Create an account</Button>
                    {this.props.children}
                </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
