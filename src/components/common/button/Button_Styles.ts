import styled, { css } from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

type Props = {
    active?: string
    disabled?: boolean
    variant: 'primary' | 'outlined' | 'link'
}

const Button = styled.button<Props>`
    cursor: pointer;
    white-space: nowrap;
    max-width: 172px;
    transition: all ease-in-out .2s;
    &:hover {
        background-image: ${theme.gradient.banner};
    }
    ${font({ weight: 400, Fmin: 10, Fmax: 22 })}
    
    ${props => props.active === "true" ? `
        ${font({ weight: 700, Fmin: 10, Fmax: 22 })}
    `: undefined}
    ${props => props.variant === 'primary' && css<Props>`
        background-color: ${theme.color.background.second};
        color: ${theme.color.text.second};
        border-color: ${theme.color.background.second};
        border-radius: 10px;
        border-width: 1px;
        border-style: solid;
        padding: 12px 24px;
        @media ${theme.media.mobile} {
            border-radius: 8px ;
            padding: 8px 16px;
        }
        &:active {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
    `}
    ${props => props.variant === 'outlined' && css<Props>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border-color: ${theme.color.background.second};
        border-radius: 10px;
        border-width: 1px;
        border-style: solid;
        padding: 12px 24px;
        @media ${theme.media.mobile} {
            border-radius: 8px ;
            padding: 8px 16px;
        }
        &:active {
            background-color: ${theme.color.background.second};
            color: ${theme.color.text.second};
            border-color: ${theme.color.background.second};
        }
    `}
    ${props => props.variant === 'link' && css<Props>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border: none;
        opacity: .7;
        &:active {
            opacity: 1;
        }
        &:hover {
        background: transparent;
    }
    `}
        &:disabled {
        opacity: .3;
        cursor: default;
    }
`

export const S = { Button }