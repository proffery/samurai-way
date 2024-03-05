import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Input } from "../../micro/input/Input.styled"
import search from "../../../assets/images/Search.svg"
import { Logout } from "./Logout"
import { AuthStateType } from "../../../redux/authReducer"

type HeaderPropsType = {
    authData: AuthStateType
    logOut: () => void
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    const { login, email, photoUrl } = props.authData
    return (
        <StyledHeader id="header">
            <StyledField search={search} bordered="false" placeholder={"Search"} />
            <Logout
                login={login}
                email={email}
                photoUrl={photoUrl}
                logOut={props.logOut}
            />
        </StyledHeader>
    )
}

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

`