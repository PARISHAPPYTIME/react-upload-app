
import { Upload, Button, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import React from 'react';

const { Title } = Typography
const { Dragger } = Upload;

class UploadPage extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    }

    handleUpload = () => {
        this.setState({
            uploading: true,
        })
        console.log(this.props)
        console.log(this.state.fileList)
    }
    render () {
        const { uploading, fileList } = this.state

        const props = {
            name: 'file',
            multiple: true,
            fileList,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
            // onChange (info) {
            //   const { status } = info.file;
            //   if (status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            //   }
            //   if (status === 'done') {
            //     message.success(`${info.file.name} file uploaded successfully.`);
            //   } else if (status === 'error') {
            //     message.error(`${info.file.name} file upload failed.`);
            //   }
            // },
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
                <Title>Introduction</Title>
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