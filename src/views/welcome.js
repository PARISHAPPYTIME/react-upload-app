import React from 'react';
import { getCancel } from '@/utils/request-cancel'

class WelcomePage extends React.Component {

    render () {
        return (
            <div className="common-width">

            </div>
        )
    }

    componentDidMount () {
        const [newRequest] = getCancel({
            url: '/upload/list',
            method: 'GET',
            params: {
                pageNo: 1,
                pageSize: 10
            }
        })
        newRequest().then(res => {
            console.log(res)
        })
    }
}

export default WelcomePage
