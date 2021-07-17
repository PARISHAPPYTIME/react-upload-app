import './list.less'
import React from 'react';
import { Table, Typography, Input } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import axios from 'axios'
import { baseUrl } from './utils/baseUrl.js'
import dayjs from 'dayjs'

const { Title } = Typography

class ListPage extends React.Component {

    state = {
        data: []
    }

    jump = (fileUrl) => {
        console.log(`${baseUrl}/${fileUrl}`)
        window.open(`${baseUrl}/${fileUrl}`)
    }

    render () {

        const columns = [
            {
                title: '文件名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return (
                        <span>
                            <FileImageOutlined className="icon1" />
                            <a target="_blank" href={`${baseUrl}/${record.path}`} rel="noreferrer">{text}</a>
                        </span>
                    )
                },
            },
            {
                title: '更新时间',
                width: 130,
                align: 'center',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: text => {
                    return <span>{dayjs(text).format('YYYY-MM-DD')}</span>
                }
            },
            {
                title: '创作者',
                width: 80,
                align: 'center',
                dataIndex: 'user_id',
                key: 'user_id',
            }
        ]

        return (
            <div className="">
                <Title>Introduction</Title>
                <Input className="mb-15" size="large" placeholder="Basic usage" />
                <Table bordered dataSource={this.state.data} columns={columns} rowKey="id" />
            </div>
        )
    }

    componentDidMount () {
        axios({
            url: `${baseUrl}/upload/list`,
            method: 'GET'
        })
            .then(res => res.data)
            .then(res => {
                console.log(res)
                this.setState({
                    data: res
                })
            })
    }
}

export default ListPage
