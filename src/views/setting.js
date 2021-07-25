import { Component } from 'react'
import { Card, Divider } from 'antd'
import { UnderlineOutlined, QrcodeOutlined, LogoutOutlined } from '@ant-design/icons'
import cookie from 'react-cookies'

const gridStyle = {
    width: '25%',
};


class SettingPage extends Component {

    logout = () => {
        cookie.remove('token')
        this.props.history.push({
            pathname: '/login'
        })
    }

    toImagePage = () => {
        this.props.history.push({
            pathname: '/code/img'
        })
    }

    render () {
        return (
            <>
                <div className="app-setting-class">
                    <Card title="更多">
                        <Card.Grid style={gridStyle} onClick={this.toImagePage}>
                            Content
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            Content
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <UnderlineOutlined />
                            <Divider type="vertical" />
                            Content
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <QrcodeOutlined />
                            <Divider type="vertical" />
                            Content
                        </Card.Grid>
                        <Card.Grid style={gridStyle} onClick={this.logout}>
                            <LogoutOutlined />
                            <Divider type="vertical" />
                            注销
                        </Card.Grid>
                    </Card>
                </div></>

        )
    }
}

export default SettingPage
