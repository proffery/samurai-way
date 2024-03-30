import { Patch } from "components/app/Router/routeNames"
import { Chat } from "components/layout/pages/localChat/Chat"
import { lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { selectStoragePath } from "store/app/appSelectors"
import { InitializationLoader } from "components/common/loaders/IniatializationLoader"
const Profile = lazy(() => import("components/layout/pages/profile/Profile"))
const Users = lazy(() => import("components/layout/pages/users/Users"))
const Messages = lazy(() => import("components/layout/pages/messages/Messages"))
const NotFound = lazy(() => import("components/layout/pages/notFound/NotFound"))

export const AppRouteSwich: React.FC = () => {
  const storagePath = useSelector(selectStoragePath)

  return (
    <Switch>
      <Route
        path={Patch.Home}
        exact
        render={() => (
          <Suspense fallback={<InitializationLoader />}>
            <Profile />
          </Suspense>
        )}
      />
      <Route
        path={Patch.ProfileParams}
        render={() => (
          <Suspense fallback={<InitializationLoader />}>
            <Profile />
          </Suspense>
        )}
      />
      <Route
        path={Patch.Users}
        render={() => (
          <Suspense fallback={<InitializationLoader />}>
            <Users />
          </Suspense>
        )}
      />
      <Route
        path={Patch.MessagesParams}
        render={() => (
          <Suspense fallback={<InitializationLoader />}>
            <Messages />
          </Suspense>
        )}
      />
      <Route
        path={Patch.NotFound}
        render={() => (
          <Suspense fallback={<InitializationLoader />}>
            <NotFound />
          </Suspense>
        )}
      />
      <Route path={Patch.Chat} component={Chat} />
      <Route path={Patch.Login} render={() => <Redirect to={`${storagePath}`} />} />
      <Route path={Patch.Other} render={() => <Redirect to={Patch.NotFound} />} />
    </Switch>
  )
}
