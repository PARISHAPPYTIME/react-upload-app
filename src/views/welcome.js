import { Typography } from 'antd'
import React from 'react';

const { Title } = Typography

class WelcomePage extends React.Component {

    render() {
        return (
            <div className="common-width">
                <Title>Welcome</Title>
            </div>
        )
    }
}

// mapStateToProps、mapDispatchToProps、mergeProps和options
export default WelcomePage
