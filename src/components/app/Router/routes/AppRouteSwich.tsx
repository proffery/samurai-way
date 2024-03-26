import { Patch } from 'components/app/Router/routeNames'
import { Messages } from 'components/layout/pages/messages/Messages'
import { NotFound } from 'components/layout/pages/notFound/NotFound'
import { Notifications } from 'components/layout/pages/notifications/Notifications'
import { Profile } from 'components/layout/pages/profile/Profile'
import { Settings } from 'components/layout/pages/settings/Settings'
import { Users } from 'components/layout/pages/users/Users'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { selectStoragePath } from 'store/app/appSelectors'

export const AppRouteSwich: React.FC = () => {
    const storagePath = useSelector(selectStoragePath)

    return <Switch>
        <Route path={Patch.Home} exact component={Profile} />
        <Route path={Patch.ProfileParams} component={Profile} />
        <Route path={Patch.Users} component={Users} />
        <Route path={Patch.MessagesParams} component={Messages} />
        <Route path={Patch.Notifications} component={Notifications} />
        <Route path={Patch.Settings} component={Settings} />
        <Route path={Patch.NotFound} component={NotFound} />
        <Route path={Patch.Login} render={() => <Redirect to={`${storagePath}`} />} />
        <Route path={Patch.Other} render={() => <Redirect to={Patch.NotFound} />} />
    </Switch>
}