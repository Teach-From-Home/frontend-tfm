import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from './userContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {user} = useContext(UserContext);

    return (
        <Route exact {...rest} render={(props) => (
            user ? 
                <Component {...props} />
            :
                <Redirect to='/login' />
        )} 
        />
    ) 
}
export default PrivateRoute;