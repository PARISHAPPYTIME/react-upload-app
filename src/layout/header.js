import React from 'react'
import { PageHeader } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons'


class HeaderComponent extends React.Component {

    jump = () => {
        console.log(this.props)
        const { match } = this.props
        if (match.path === '/main') {
            this.props.history.push({
                pathname: '/list'
            })
        } else {
            this.props.history.push({
                pathname: '/main'
            })
        }

    }

    render () {
        return (
            <PageHeader
                ghost={false}
                title="Introduction"
                subTitle="yxswy"
                extra={[
                    <AlignRightOutlined key="1" onClick={this.jump} />
                ]} />
        )
    }
}

export default HeaderComponent
