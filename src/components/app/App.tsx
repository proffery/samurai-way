import { LoginRouteSwich } from 'components/app/Router/routes/LoginRouteSwich'
import { Alerts } from 'components/common/alerts/Alerts'
import { Footer } from 'components/layout/footer/Footer'
import { Header } from 'components/layout/header/Header'
import { Navbar } from 'components/layout/navbar/Navbar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectAppIsLoading, selectIsInitialized
} from 'store/app/appSelectors'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import styled, { css } from 'styled-components'
import { useActions } from 'utils/customHooks/useActions'
import { theme } from '../../styles/Theme.styled'
import { InitializationLoader } from '../common/loaders/IniatializationLoader'
import { LoadingLoader } from '../common/loaders/LoadingLoader.styled'
import { AppRouteSwich } from 'components/app/Router/routes/AppRouteSwich'
import { Patch } from 'components/app/Router/routeNames'

function App() {
  const isLoggedIn = useSelector(selectIsloggedIn)
  const isLoading = useSelector(selectAppIsLoading)
  const isInitialized = useSelector(selectIsInitialized)
  const { savePathToStorage, initializeApp } = useActions()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { pathname } = useHistory().location

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    pathname !== Patch.Login && savePathToStorage(pathname)
  }, [pathname])

  if (!isLoggedIn) {
    return (
      <LoginWrapper>
        {isLoading && <LoadingLoader />}
        {!isInitialized && <InitializationLoader />}
        <Alerts />
        <LoginRouteSwich />
        <Footer />
      </LoginWrapper>
    )
  }

  return (
    <Wrapper collapsed={isCollapsed.toString()}>
      {isLoading && <LoadingLoader />}
      {!isInitialized && <InitializationLoader />}
      <Alerts />
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Header />
      <AppRouteSwich />
      <Footer />
    </Wrapper>
  )
}

export default App

type Container = {
  collapsed: string
}
const Wrapper = styled.div<Container>`
  display: grid;
  grid-template-rows: 104px 93vh 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  transition: all ease-in-out .2s;
  main {
    grid-area: 2 / 2 / 3 / 6 ;
  }
  nav {
    grid-area: 1 / 1 / 3 / 2 ;
  }
  header {
    grid-area: 1 / 2 / 2 / 6 ;
  }
  footer {
    grid-area: 3 / 1 / 4 / 6 ;
  }
  ${props => props.collapsed === 'false' ? css<Container>`
    grid-template-columns: 5px repeat(4, 1fr);
    main {
      grid-area: 2 / 1 / 3 / 6 ;
      padding-left: min(45px, 12vw);
      height: 100%;
    }
    nav {
      grid-area: 1 / 1 / 3 / 1 ;
      width: 32px;
      padding: min(45px, 16vw) 4px;
    }
    header {
      grid-area: 1 / 1 / 2 / 6 ;
      padding-left: min(45px, 12vw);
    }
  `: undefined}
  @media ${theme.media.mobile} {
    grid-template-rows: 80px 93vh 1fr;
  }
`
const LoginWrapper = styled.div`
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  main {
    height: 80vh;
  }
`
