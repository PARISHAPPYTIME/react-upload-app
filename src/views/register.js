import { Input, Typography, Button, Form } from 'antd'
import React from 'react';
import { connect } from 'react-redux'
import server from '@/utils/request.js'

const { Title } = Typography

class RegisterPage extends React.Component {
    onFinish = (form) => {
        server({
            url: '/user/register',
            method: 'POST',
            data: form
        }).then(res => {
            if (res.code === 200) {
                this.props.history.push({
                    pathname: '/login'
                })
            }
        })
    };

    onFinishFailed = (errorInfo) => { };

    toLogin = () => {
        this.props.history.push({
            pathname: '/login'
        })
    }

    render() {
        return (
            <div className="app-login-container">
                <div className="app-login">
                    <Title>Sign up</Title>
                    <Form
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
                                { required: true, message: 'Please input your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        if (value.length < 8 || value.length > 20) {
                                            return Promise.reject(new Error('The length should be between 8 and 20 bits!'));
                                        }
                                        return Promise.resolve();
                                    },
                                })
                            ]}>
                            <Input.Password size="large" placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="repassword"
                            rules={[
                                { required: true, message: 'Enter your password again!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                })
                            ]}>
                            <Input.Password size="large" placeholder="Enter your password again" />
                        </Form.Item>
                        <Form.Item className="w-btn">
                            <Button type="primary" block htmlType="submit">注册</Button>
                        </Form.Item>
                        <Button type="link" onClick={this.toLogin}>Already have an account</Button>
                    </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
