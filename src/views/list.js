import React from 'react';
import { Table, Space, message, Divider, Button } from 'antd'
import { baseUrl } from '@/utils/baseUrl.js'
import dayjs from 'dayjs'
import server from '@/utils/request'

class ListPage extends React.Component {

    state = {
        data: []
    }

    jump = (fileUrl) => {
        window.open(`${baseUrl}/${fileUrl}`)
    }

    deleteItem = (item) => {
        const { id } = item
        server({
            url: `${baseUrl}/upload/remove`,
            method: 'GET',
            params: { id }
        })
            .then(res => {
                message.success('列表数据删除成功')
                this.getList()
            })
    }

    powerDownLoadFile = (filename) => {
        // window.open(`${baseUrl}/upload/download/${filename}`)
    }

    getList() {
        server({
            url: `/upload/list`,
            method: 'GET'
        })
            .then(res => {
                this.setState({
                    data: res?.data?.data || []
                })
            })
    }

    render () {
        const columns = [
            {
                title: '序号',
                width: 65,
                align: 'center',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            },
            {
                title: '备注',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    return (
                        <span>
                            <a target="_blank" href={`${baseUrl}/${record.path}`} rel="noreferrer">{text}</a>
                        </span>
                    )
                },
                filters: [
                    { text: 'PNG 文件', value: 'London22222222222222222' },
                    { text: 'JPEG 文件', value: 'New 2York' },
                    { text: 'PDF 文件', value: 'New Y3ork' },
                    { text: 'WORD 文件', value: 'New 4York' },
                ],
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
                width: 230,
                align: 'center',
                dataIndex: 'actions',
                fixed: 'right',
                key: 'actions',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                            <span onClick={() => this.deleteItem(record)} className="theme-color">删除</span>
                            <Divider type="vertical" />
                            <span className="theme-color">详情</span>
                            <Divider type="vertical" />
                            <a target="_blank" href={`${baseUrl}/upload/download/${record.filename}`} download={record.filename} rel="noreferrer">下载</a>
                        </Space>
                    )
                }
            }
        ]

        return (
            <div className="list-class">
                <Table dataSource={this.state.data} scroll={{ x: 1100 }} columns={columns} rowKey="id" />
            </div>
        )
    }

    componentDidMount () {
        this.getList()
    }
}

export default ListPage
