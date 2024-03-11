import styled from "styled-components"
import { memo } from 'react'
import { theme } from 'styles/Theme.styled'

export const InitializationLoader: React.FC = memo(() => {
  return (
    <Background>
      <Loader />
    </Background>
  )
})

const Background = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.color.background.primary};
  z-index: 99999;
`
const Loader = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96px;
    height: 16px;
    display: inline-block;
    background-color: #FFF;
    border: 1px solid #FFF;
    border-radius: 4px;
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
    font-size: 30px;
    background-size: 1em 1em;
    box-sizing: border-box;
    animation: barStripe 1s linear infinite;

@keyframes barStripe {
  0% {
    background-position: 1em 0;
  }
  100% {
    background-position: 0 0;
  }
}
`