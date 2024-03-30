import { Icon } from "components/common/icon/Icon"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { font } from "styles/Font"
import { theme } from "styles/Theme.styled"

type StylesProps = {
  variant: "primary" | "secondary"
}
const Link = styled(NavLink)<StylesProps>`
  flex-direction: column;
  align-items: start;
  color: inherit;
  opacity: 1;
  ${font({ family: "Orbitron", weight: 700, Fmin: 18, Fmax: 30 })}
  ${(props) =>
    props.variant === "primary"
      ? css<StylesProps>`
          color: ${theme.color.text.primary};
        `
      : css<StylesProps>`
          color: ${theme.color.text.second};
        `}
`
const BurgerIcon = styled(Icon)<StylesProps>`
  flex-direction: column;
  align-items: start;
  color: inherit;
  cursor: pointer;
  opacity: 1;
  ${font({ family: "Orbitron", weight: 700, Fmin: 18, Fmax: 30 })}
  ${(props) =>
    props.variant === "primary"
      ? css<StylesProps>`
          color: ${theme.color.text.primary};
        `
      : css<StylesProps>`
          color: ${theme.color.text.second};
        `}
`

export const S = {
  Link,
  BurgerIcon,
}
