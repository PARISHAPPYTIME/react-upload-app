import './list.less'
import React from 'react';
import { List, Typography } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title } = Typography

class ListPage extends React.Component {

    state = {
        data: []
    }

    render () {

        return (
            <div className="">
                <Title>Introduction</Title>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <span>
                                <FileImageOutlined className="icon1" /> <div className="es-1">{item}</div>
                            </span>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    componentDidMount() {
        axios({
            url: 'http://localhost:3000/upload/list',
            method: 'GET'
        })
            .then(res => res.data)
            .then(res => {
                this.setState({
                    data: res.map(el => el.name)
                })
            })
    }
}

export default ListPage
