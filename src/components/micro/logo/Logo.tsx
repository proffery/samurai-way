import { Link } from "../../../components/micro/link/Link.styled"
import { font } from '../../../styles/Font'
import styled from "styled-components"
import { Icon } from '../icon/Icon'

type LogoPropsType = {
    variant: 'primary' | 'secondary'
    type: 'text' | 'logo'
}

export const Logo = (props: LogoPropsType) => {
    return (
        <LogoLink variant={props.variant} href="/">
            {props.type === 'text' ?
                <>
                    <span>Social</span>
                    <span>Network</span>
                </>
            : <Icon iconId={'logo'} viewBox='0 0 1024 1024'/>}
        </LogoLink>
    )
}

const LogoLink = styled(Link)`
    flex-direction: column;
    align-items: start;
    opacity: 1;
    ${font({ family: 'Orbitron', weight: 700, Fmin: 18, Fmax: 30 })}
`