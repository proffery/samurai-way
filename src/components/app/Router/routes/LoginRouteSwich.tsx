import { Patch } from "components/app/Router/routeNames"
import { InitializationLoader } from "components/common/loaders/IniatializationLoader"
import React, { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
const Login = lazy(() => import("components/layout/login/Login"))

export const LoginRouteSwich: React.FC = () => {
    return (
        <Switch>
            <Route path={Patch.Home} exact render={() => <Redirect to={Patch.Login} />} />
            <Route
                path={Patch.Login}
                render={() => (
                    <Suspense fallback={<InitializationLoader />}>
                        <Login />
                    </Suspense>
                )}
            />
            <Route path={Patch.Other} render={() => <Redirect to={Patch.Login} />} />
        </Switch>
    )
}
