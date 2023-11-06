import styled, { css } from "styled-components";
import { theme } from "../../../styles/Theme.styled";
import { ReactElement } from "react";
import { font } from "../../../styles/Font";

type ButtonPropsType = {
    button_style: 'primary' | 'outlined' | 'link'
    type?: 'button' | 'reset' | 'submit'
    className?: string
    name?: string | ReactElement
    title?: string
    onClick: (e?:any) => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const onClickButtonHandler = (e?:any) => {
        props.onClick(e)
    }

    return (
        <StyledButton 
            button_style={props.button_style} 
            onClick={onClickButtonHandler} 
            type={props.type || 'button'}
            className={props.className}
            title={props.title}
        >{props.name || ''}</StyledButton>
    )
}

type StyledButtonPropsType = {
    button_style: 'primary' | 'outlined' | 'link'
}

const StyledButton = styled.button<StyledButtonPropsType>`
    cursor: pointer;
    white-space: nowrap;
    max-width: 172px;
    ${font({weight: 400, Fmin: 10, Fmax: 22})}

    ${props => props.button_style === 'primary' && css<StyledButtonPropsType>`
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
        &:hover {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
    `}
    
    ${props => props.button_style === 'outlined' && css<StyledButtonPropsType>`
        background-color: ${theme.color.background.primary};
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
        &:hover {
            background-color: ${theme.color.background.second};
            color: ${theme.color.text.second};
            border-color: ${theme.color.background.second};
        }
    `}
    
    ${props => props.button_style === 'link' && css<StyledButtonPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border: none;
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
`