
import { Icon } from 'components/common/icon/Icon'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

type LogoPropsType = {
    variant: 'primary' | 'secondary'
    type: 'text' | 'logo'
}

export const Logo:React.FC<LogoPropsType> = memo((props) => {
    return (props.type === 'text' ?
        <LogoLink variant={props.variant} to="/">
            <>
                <p>Social</p>
                <p>Network</p>
            </>
        </LogoLink>
        : <StyledIcon iconId={'burgerMenu'} viewBox='0 0 24 24' />
    )
})


type LinkPropsType = {
    variant: 'primary' | 'secondary'
}
const LogoLink = styled(NavLink) <LinkPropsType>`
    flex-direction: column;
    align-items: start;
    color: inherit;
    opacity: 1;
    ${font({ family: 'Orbitron', weight: 700, Fmin: 18, Fmax: 30 })}
    ${props => props.variant === 'primary'
        ? css<LinkPropsType>`
        color: ${theme.color.text.primary};
    `: css<LinkPropsType>`
    color: ${theme.color.text.second};
    `
    }
`
const StyledIcon = styled(Icon) <LinkPropsType>`
    flex-direction: column;
    align-items: start;
    color: inherit;
    cursor: pointer;
    opacity: 1;
    ${font({ family: 'Orbitron', weight: 700, Fmin: 18, Fmax: 30 })}
    ${props => props.variant === 'primary'
        ? css<LinkPropsType>`
        color: ${theme.color.text.primary};
    `: css<LinkPropsType>`
    color: ${theme.color.text.second};
    `
    }
`