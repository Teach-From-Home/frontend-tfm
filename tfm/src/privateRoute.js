import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const logged = true
    return (
        <Route exact {...rest} render={(props) => (
            logged ? 
                <Component {...props} />
            :
                <Redirect to='/login' />
            )} 
        />
    ) 
}
export default PrivateRoute;