import React from 'react';
import { Table, Typography, Input, Space, message } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl.js'
import dayjs from 'dayjs'

const { Title } = Typography

class ListPage extends React.Component {

    state = {
        data: []
    }

    jump = (fileUrl) => {
        window.open(`${baseUrl}/${fileUrl}`)
    }

    deleteItem = (item) => {
        const { id } = item
        axios({
            url: `${baseUrl}/upload/remove`,
            method: 'GET',
            params: { id }
        })
            .then(res => res.data)
            .then(res => {
                message.success('列表数据删除成功')
                this.getList()
            })
    }

    getList() {
        axios({
            url: `${baseUrl}/upload/list`,
            method: 'GET'
        })
            .then(res => res.data)
            .then(res => {
                this.setState({
                    data: res
                })
            })
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
                width: 110,
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
                dataIndex: 'userId',
                key: 'userId',
            },
            {
                title: '操作',
                width: 100,
                align: 'center',
                dataIndex: 'actions',
                key: 'actions',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                            <span onClick={() => this.deleteItem(record)} className="theme-color">删除记录</span>
                        </Space>
                    )
                }
            }
        ]

        return (
            <div className="list-class">
                <Table dataSource={this.state.data} columns={columns} rowKey="id" />
            </div>
        )
    }

    componentDidMount () {
        this.getList()
    }
}

export default ListPage
