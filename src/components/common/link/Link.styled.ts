import styled, { css } from "styled-components"
import { theme } from 'styles/Theme.styled'

type LinkPropsType = {
    variant: 'primary' | 'secondary' | 'buttonPrimary' | 'buttonSecondary',
}

export const Link = styled.a<LinkPropsType>`
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    align-items: center;

    ${props => props.variant === 'buttonPrimary' && css<LinkPropsType>`
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
    
    ${props => props.variant === 'buttonSecondary' && css<LinkPropsType>`
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
    
    ${props => props.variant === 'primary' && css<LinkPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        opacity: .7;
        &:active {
            opacity: 1;
        }
    `}
    
    ${props => props.variant === 'secondary' && css<LinkPropsType>`
        background-color: transparent;
        color: ${theme.color.text.second};
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
`