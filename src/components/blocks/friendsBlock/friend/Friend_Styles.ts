import { font } from "styles/Font"
import { Avatar } from "components/common/avatar/Avatar"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Friend = styled(NavLink)`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  gap: 6px;
  padding: min(15px, 1vw);

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${theme.color.background.primary};
    bottom: 0;
  }

  &:hover {
    outline: 1px solid ${theme.color.background.primary};
    background-color: ${theme.color.background.primary};
    border-radius: 10px;
  }

  @media ${theme.media.mobile} {
    flex-direction: column;
    justify-content: flex-start;
    max-width: 20%;
    min-width: 65px;
  }
`
const Photo = styled(Avatar)`
  width: 45%;
`
const Name = styled.span`
  width: 53%;
  text-align: center;
  ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
  color: ${theme.color.text.primary_dark};
  word-wrap: break-word;
  overflow: hidden;
`
export const S = {
  Friend,
  Photo,
  Name,
}
