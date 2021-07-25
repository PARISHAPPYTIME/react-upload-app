import React from 'react'
import HeaderComponent from '@/layout/header';
import { Layout, Menu, Breadcrumb } from 'antd'
import {
    UserOutlined, BarsOutlined, NotificationOutlined,
    UploadOutlined, AppstoreOutlined, FolderOpenOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import '@/App.less';

import IconComponent from './icons.js'

const { Content, Sider } = Layout;

class MainComponent extends React.Component {

    state = {
        selectedKeys: []
    }

    linkTo = (str) => {
        this.props.history.push({
            pathname: str
        })
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.selectedKeys[0]) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                selectedKeys: nextProps.location.pathname
            }
        }

        return { selectedKeys: [] }
    }

    render () {
        const { props } = this
        return (
            <div className="App">
                <Layout id="components-layout-demo-top-side-2">
                    <Sider collapsed={true} width={300} className="app-layout-sider">
                        <Menu
                            selectedKeys={this.state.selectedKeys}
                            theme="dark"
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item icon={<UserOutlined />} key="/list2" onClick={() => this.linkTo('/list2')}></Menu.Item>
                            <Menu.Item icon={<BarsOutlined />} key="/list" onClick={() => this.linkTo('/list')}></Menu.Item>
                            <Menu.Item icon={<NotificationOutlined />} key="/message" onClick={() => this.linkTo('/message')}></Menu.Item>
                            <Menu.Item icon={<UploadOutlined />} key="/main" onClick={() => this.linkTo('/main')}></Menu.Item>
                            <Menu.Item icon={<AppstoreOutlined />} key="/setting" onClick={() => this.linkTo('/setting')}></Menu.Item>
                            <Menu.Item icon={<FolderOpenOutlined />} key="/folder" onClick={() => this.linkTo('/folder')}></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px 104px' }}>
                        <div className="top-break">
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <IconComponent />
                        </div>
                        <HeaderComponent {...props} />
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div className="app-container">
                                {props.children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withRouter(MainComponent)