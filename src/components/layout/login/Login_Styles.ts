import { BlockSection } from "components/blocks/BlockSection.styled"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Login = styled.main`
  display: flex;
  background-color: ${theme.color.background.primary};
  align-items: center;
  justify-content: center;
  min-height: fit-content;
`
const Section = styled(BlockSection)`
  display: flex;
  width: 35%;
  height: fit-content;
  min-width: 320px;
  @media ${theme.media.mobile} {
    height: 100%;
    width: 100%;
  }
`

export const S = {
  Login,
  Section,
  Notification,
}
