import { theme } from '../../../styles/Theme.styled';
import styled from "styled-components";

export const LoadingLoader = styled.div`
    width: 100%;
    height: 3px;
    position: fixed;
    overflow: hidden;
    background-color: #ddd;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    top: 0;
    left: 0;
    z-index: 1000;
    &::before {
        content: "";
        position: absolute;
        left: -50%;
        height: 3px;
        width: 40%;
        background-color: ${theme.color.background.second};
        -webkit-animation: lineAnim 1s linear infinite;
        -moz-animation: lineAnim 1s linear infinite;
        animation: lineAnim 1s linear infinite;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
    }
    @keyframes lineAnim {
        0% {
            left: -40%;
        }
        50% {
            left: 20%;
            width: 80%;
        }
        100% {
            left: 100%;
            width: 100%;
        }
    }
`