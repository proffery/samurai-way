import styled from "styled-components"
import { ChangeEvent, memo } from 'react'
import { Logout } from 'components/layout/header/Logout'
import { AuthStateType } from 'store/auth/authReducer'
import { theme } from 'styles/Theme.styled'
import { Input } from 'components/common/input/Input.styled'
import search from '../../../assets/images/Search.svg'

type HeaderPropsType = {
    logout: () => void
    setUsersSearchTerm: (searchTerm: string) => void
    searchTerm: string
    authData: AuthStateType
}

export const Header: React.FC<HeaderPropsType> = memo((props) => {
    const { login, email, photoUrl } = props.authData
    const { searchTerm, setUsersSearchTerm, logout } = props

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsersSearchTerm(e.currentTarget.value)
    }
    return (
        <StyledHeader id="header">
            <StyledForm>
                <StyledField search={search}
                    bordered="false"
                    placeholder={"Search"}
                    value={searchTerm}
                    onChange={onSearchChangeHandler}
                />
            </StyledForm>
            <Logout
                login={login}
                email={email}
                photoUrl={photoUrl}
                logOut={logout}
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
const StyledForm = styled.form`
    display: flex;
    width: 100%;
`
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