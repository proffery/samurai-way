import styled from "styled-components"
import { memo } from 'react'
import { Logout } from 'components/layout/header/Logout'
import { AuthStateType } from 'store/auth/authReducer'
import { theme } from 'styles/Theme.styled'
import { Input } from 'components/common/input/Input.styled'
import search from '/assets/images/Search.svg'

type HeaderPropsType = {
    authData: AuthStateType
    logout: () => void
}

export const Header: React.FC<HeaderPropsType> = memo((props) => {
    const { login, email, photoUrl } = props.authData
    return (
        <StyledHeader id="header">
            <StyledField search={search} bordered="false" placeholder={"Search"} />
            <Logout
                login={login}
                email={email}
                photoUrl={photoUrl}
                logOut={props.logout}
            />
        </StyledHeader>
    )
})

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    background-color: ${theme.color.background.primary};
    padding: min(30px, 2vw);
    gap: min(30px, 2vw);
`

type StyledFieldPropsType = {
    search: string
}

const StyledField = styled(Input) <StyledFieldPropsType>`
    padding-left: 40px;
    width: 100%;
    background-image: url(${props => props.search});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 22px; 
    height: min(100%, 4vh);
    &::placeholder {
        color: ${theme.color.text.primary_dark};
    }
    &:focus {
        box-shadow: ${theme.shadow.block};
    }

`