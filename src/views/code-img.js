import { Component } from 'react'
import { Card, Avatar, Col, Row, Spin } from 'antd';
import server from '@/utils/request.js'
import { baseUrl } from '@/utils/baseUrl.js'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Meta } = Card;

class CodeImagePage extends Component {

    state = {
        list: [{ id: 1 }],
        loading: false
    }

    onError = function (e) {
        e.target.src = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }

    render () {
        return (
            <div>
                <div className="site-card-wrapper app-setting-class">
                    {
                        this.state.loading
                            ? (
                                <div className="example">
                                    <Spin indicator={antIcon} />
                                </div>
                            )
                            : (
                                <Row gutter={16}>
                                    {
                                        this.state.list.map(el => {
                                            return (
                                                <Col xs={24} sm={24} md={12} lg={8} xl={6} key={el.id}>
                                                    <Card
                                                        bordered={false}
                                                        cover={
                                                            <div className="card-cover-image">
                                                                <img
                                                                    onError={this.onError}
                                                                    alt="example"
                                                                    src={`${baseUrl}/${el.path}`}
                                                                />
                                                            </div>
                                                        }>
                                                        <Meta
                                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                            title={el.name}
                                                            description="www.instagram.com"
                                                        />
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                    }



                </div>
            </div>
        )
    }

    componentDidMount () {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            server({
                url: '/code/image',
                method: 'GET'
            }).then(res => {
                console.log(res)
                this.setState({
                    list: res?.data?.data || []
                })
            }).finally(() => {
                this.setState({
                    loading: false
                })
            })
        }, 200)
    }
}

export default CodeImagePage
