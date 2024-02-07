import styled, { css } from "styled-components";
import { theme } from "../../../styles/Theme.styled";
import { ReactElement, MouseEvent } from "react";
import { font } from "../../../styles/Font";

type ButtonPropsType = {
    variant: 'primary' | 'outlined' | 'link'
    type?: 'button' | 'reset' | 'submit'
    className?: string
    name?: string | ReactElement
    title?: string
    disabled?: boolean
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.onClick(e)
    }

    return (
        <StyledButton
            variant={props.variant}
            onClick={onClickButtonHandler}
            type={props.type || 'button'}
            className={props.className}
            title={props.title}
            disabled={props.disabled || false}
        >{props.name || ''}</StyledButton>
    )
}

type StyledButtonPropsType = {
    variant: 'primary' | 'outlined' | 'link'
}

const StyledButton = styled.button<StyledButtonPropsType>`
    cursor: pointer;
    white-space: nowrap;
    max-width: 172px;
    ${font({ weight: 400, Fmin: 10, Fmax: 22 })}

    ${props => props.disabled && css<StyledButtonPropsType>`
        opacity: .5;
        cursor: default;
    `}

    ${props => props.variant === 'primary' && css<StyledButtonPropsType>`
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
    
    ${props => props.variant === 'outlined' && css<StyledButtonPropsType>`
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
    
    ${props => props.variant === 'link' && css<StyledButtonPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border: none;
        opacity: .7;
        &:hover {
            opacity: 1;
        }
    `}
`