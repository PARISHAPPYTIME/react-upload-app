import React from 'react'
import { Skeleton, Card } from 'antd'

class MessagePage extends React.Component {
    render () {
        return (
            <>
                {/* <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Inner Card title"
                >
                    Inner Card content
                </Card> */}
                <Skeleton active={true} avatar paragraph={{ rows: 4 }} />
            </>

        )
    }
}

export default MessagePage
