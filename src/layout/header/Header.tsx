import styled from "styled-components"
import { theme } from "../../styles/Theme.styled"
import { Field } from "../../components/field/Field.styled"
import search from "../../assets/images/Search.svg"

export const Header = () => {
    return (
        <StyledHeader>
            <StyledField search={search} bordered="false" placeholder={"Search"}/> 
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    display: flex;
    background-color: ${theme.color.background.primary};
    padding: 22px 32px;
    @media ${theme.media.mobile} {
        padding: 20px;
    }
`

type StyledFieldPropsType = {
    search: string
}

const StyledField = styled(Field)<StyledFieldPropsType>`
    padding-left: 40px;
    background-image: url(${props => props.search});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 22px; 
    
    &::placeholder {
    color: ${theme.color.text.primary_dark};
    }

`