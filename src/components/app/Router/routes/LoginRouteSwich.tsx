import { Patch } from 'components/app/Router/routeNames'
import { Login } from 'components/layout/login/Login'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

export const LoginRouteSwich: React.FC = () => {
    return <Switch>
        <Route path={Patch.Home} exact render={() => <Redirect to={Patch.Login} />} />
        <Route path={Patch.Login} render={() => <Login />} />
        <Route path={Patch.Other} render={() => <Redirect to={Patch.Login} />} />
    </Switch>
}