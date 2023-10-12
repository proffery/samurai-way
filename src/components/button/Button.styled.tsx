import styled, { css } from "styled-components";
import { theme } from "../../styles/Theme.styled";

type ButtonPropsType = {
    type: 'primary' | 'outlined' | 'link'
}

export const Button = styled.button<ButtonPropsType>`
    cursor: pointer;
    white-space: nowrap;

    ${props => props.type === 'primary' && css<ButtonPropsType>`
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
    
    ${props => props.type === 'outlined' && css<ButtonPropsType>`
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
    
    ${props => props.type === 'link' && css<ButtonPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border: none;
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
`