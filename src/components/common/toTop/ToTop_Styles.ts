import { Link } from "react-router-dom"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const ToTop = styled(Link)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  background-color: ${theme.color.background.primary};
  height: 30px;
  width: 30px;
  top: 95%;
  left: 95%;
  padding: 5px;
  border-radius: 50%;
  transform: translate(-95%, -95%) rotate(90deg);
  z-index: 99999;
  &:hover {
    box-shadow: ${theme.shadow.block};
  }
`

export const S = { ToTop }
