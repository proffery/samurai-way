import styled from "styled-components"
import { Container } from "../../components/Container"

export const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <span>Footer copiright 2023</span>
            </Container>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    ${Container} {
        align-items: center;
        justify-content: center;
    }
`