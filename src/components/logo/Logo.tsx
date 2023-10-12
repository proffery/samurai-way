import { Link } from "../../components/link/Link.styled"
import { font } from '../../styles/Font'
import styled from "styled-components"

type LogoType ={
    type: 'primary' | 'secondary'
}

export const Logo = (props: LogoType) => {
    return (
        <LogoLink type={props.type} href="/">
            <span>Social</span>
            <span>Network</span>
        </LogoLink>
    )
}

const LogoLink = styled(Link)`
    flex-direction: column;
    align-items: start;
    ${font({family: 'Orbitron', weight: 700, Fmin: 14, Fmax: 36})}
`