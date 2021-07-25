import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import cookie from 'react-cookies'

let authenticate = () => {
    const token = cookie.load('token')
    return token
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return authenticate()
                    ? <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                form: props.location
                            }
                        }}></Redirect>
            }}>
        </Route>
    )
}

export default PrivateRoute
