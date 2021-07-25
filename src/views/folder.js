import { Component } from 'react'
import { Layout, Affix, PageHeader } from 'antd'

import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'
import FolderTree from '@/components/folder-tree.js'

const { Content, Sider } = Layout

const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

class FolderPage extends Component {

    state = {
        title: '',
        content: '',
    }

    setExpandedKeys = (res) => {
        this.setState({
            expandedKeys: res
        })
    }

    setContent = ({ content, title }) => {
        this.setState({
            content,
            title
        })
    }

    render () {
        return (
            <Layout className="app-folder-class">
                <Sider
                    style={{
                        background: 'white'
                    }} width={306}>
                    <FolderTree setContent={this.setContent} />
                </Sider>
                <Content>
                    <div className="md-content">
                        <Affix offsetTop={1}>
                            <PageHeader
                                className="site-page-header"
                                title={this.state.title}
                            />
                        </Affix>
                        <ReactMarkdown className="markdown-body">
                            {this.state.content}
                        </ReactMarkdown>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default FolderPage
