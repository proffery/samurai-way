import { AlertType } from './../../../../store/app/appReducer';
import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

type StyledProps = {
    className?: string
    request: AlertType
    delay: number
}
const Alert = styled.div<StyledProps>`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: #ffffff;
    border-radius: .5em;
    border: 1px solid;
    margin: 10px 0px;
    padding: 12px;
    width: 100%;
    
    ${props => props.request === 'failed' && css<StyledProps>`
        background-color: ${theme.color.background.status_error};
    `}
    ${props => props.request === 'succeeded' && css<StyledProps>`
        background-color: ${theme.color.background.status_success};
    `}
    ${props => (props.request === 'info') && css<StyledProps>`
        background-color: ${theme.color.background.status_info};
    `}
    @media ${theme.media.mobile} {
        padding: 6px;
    }
    &::before {
        content: "";
        position: absolute;
        bottom: 0%;
        left: 0;
        width: 100%;
        height: 0%;
        background: ${theme.gradient.banner};
        animation: moveColor ${props => props.delay / 1000}s linear;
        animation-fill-mode: forwards;
    }
    @keyframes moveColor {
        100% {
            height: 100%;
        }
        0% {
            height: 0%;
        }
    }
`
const Message = styled.span`
    color: ${theme.color.text.second};
`
const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
`
export const S = {
    Alert,
    Container,
    Message
}