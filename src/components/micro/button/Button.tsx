import styled, { css } from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"
import { MouseEvent } from "react"

type ButtonPropsType = {
    variant: 'primary' | 'outlined' | 'link'
    className?: string
    isActive?: boolean
    disabled?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement> ) => void
}

export const Button: React.FC<ButtonPropsType &
    React.HTMLProps<HTMLButtonElement>> = (props) => {

        const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.onClick && props.onClick(e)
        }

        return (
            <StyledButton
                variant={props.variant}
                onClick={onClickButtonHandler}
                className={props.className}
                active={props.isActive?.toString() || 'false'}
                disabled={props.disabled || false}
            >{props.children}</StyledButton>
        )
    }

type StyledButtonPropsType = {
    variant: 'primary' | 'outlined' | 'link'
    active?: string
    disabled?: boolean
}

const StyledButton = styled.button<StyledButtonPropsType>`
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
        &:active {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
    `}
    
    ${props => props.variant === 'outlined' && css<StyledButtonPropsType>`
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
    
    ${props => props.variant === 'link' && css<StyledButtonPropsType>`
        background-color: transparent;
        color: ${theme.color.text.primary};
        border: none;
        opacity: .7;
        &:active {
            opacity: 1;
        }
    `}
        &:disabled {
        opacity: .3;
        cursor: default;
    }
`