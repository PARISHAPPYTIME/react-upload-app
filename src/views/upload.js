
import { Upload, Button, Typography, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import React from 'react';
import { baseUrl } from '@/utils/baseUrl.js'
import server from '@/utils/request.js'

import sock from '@/utils/socket.js'

const { Title } = Typography
const { Dragger } = Upload;

class UploadPage extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        fileName: ''
    }

    handleUpload = () => {
        if (this.state.fileList.length === 0) {
            return message.error('请选择需要上传的文件')
        }

        this.setState({
            uploading: true,
        })

        const arr = []
        this.state.fileList.forEach(file => {
            const formData = new FormData()
            formData.append('name', this.state.fileName || file.name)
            formData.append('file', file)
            arr.push(server({
                url: `${baseUrl}/upload/append`,
                method: 'POST',
                data: formData
            }))
        })

        Promise.all(arr).finally(() => {
            this.setState({
                uploading: false,
                fileList: [],
                fileName: ''
            })
            sock.emit('someOneUploadFile', {
                number: arr.length
            })
        })
    }

    handleInput = (e) => {
        this.setState({
            fileName: e.target.value
        })
    }

    render () {
        const { uploading, fileList } = this.state

        const props = {
            name: 'file',
            multiple: true,
            fileList,
            action: '',
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    }
                })
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }))
                return false
            },
            onDrop (e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        }

        return (
            <div>
                <Input value={this.state.fileName} onChange={this.handleInput} className="mb-15" size="large" placeholder="Basic usage" />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                <div className="w-btn">
                    <Button onClick={this.handleUpload} loading={uploading} type="primary" block>确定上传</Button>
                </div>
            </div>
        )
    }
}


export default UploadPage