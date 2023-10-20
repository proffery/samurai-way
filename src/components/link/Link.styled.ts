import styled, { css } from "styled-components"
import { theme } from "../../styles/Theme.styled"


type LinkPropsType = {
    link_style: 'primary' | 'secondary' | 'buttonPrimary' | 'buttonSecondary',
}

export const Link = styled.a<LinkPropsType>`
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    align-items: center;

    ${props => props.link_style === 'buttonPrimary' && css<LinkPropsType>`
        background-color: ${theme.color.background.second};
        color: ${theme.color.text.second};
        border-color: ${theme.color.background.second};
        border-radius: 10px;
        border-width: 1px;
        border-style: solid;
        
        &:hover {
            background-color: transparent;
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
    `}
    
    ${props => props.link_style === 'buttonSecondary' && css<LinkPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border-color: ${theme.color.background.second};
        border-radius: 10px;
        border-width: 1px;
        border-style: solid;
        &:hover {
            background-color: ${theme.color.background.second};
            color: ${theme.color.text.second};
            border-color: ${theme.color.background.second};
        }
    `}
    
    ${props => props.link_style === 'primary' && css<LinkPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
    
    ${props => props.link_style === 'secondary' && css<LinkPropsType>`
        background-color: transparent;
        color: ${theme.color.text.second};
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
`