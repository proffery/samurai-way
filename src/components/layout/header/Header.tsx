import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Field } from "../../../components/micro/field/Field.styled"
import search from "../../../assets/images/Search.svg"
import { Logout } from "./Logout"

type HeaderPropsType = {
    email: string
    login: string
    isLoggedIn: boolean
    photoUrl: string
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <StyledHeader id="header">
            <StyledField search={search} bordered="false" placeholder={"Search"} />
            {props.isLoggedIn && <Logout email={props.email} login={props.login} photoUrl={props.photoUrl} />}
            
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

const StyledField = styled(Field) <StyledFieldPropsType>`
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