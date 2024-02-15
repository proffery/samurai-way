import { Link } from "../../../components/micro/link/Link.styled"
import { font } from '../../../styles/Font'
import styled from "styled-components"

type LogoPropsType ={
    logo_style: 'primary' | 'secondary'
}

export const Logo = (props: LogoPropsType) => {
    return (
        <LogoLink variant={props.logo_style} href="/">
            <span>Social</span>
            <span>Network</span>
        </LogoLink>
    )
}

const LogoLink = styled(Link)`
    flex-direction: column;
    align-items: start;
    opacity: 1;
    ${font({family: 'Orbitron', weight: 700, Fmin: 18, Fmax: 30})}
`