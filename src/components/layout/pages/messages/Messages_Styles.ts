import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Messages = styled.main`
  height: 100%;
  gap: min(30px, 2vw);
  display: flex;
  overflow-x: hidden;
  @media ${theme.media.mobile} {
    flex-direction: column;
  }
`
const FriendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: min(30px, 2vw);
  min-width: 170px;
  max-width: 20%;
  @media ${theme.media.mobile} {
    display: none;
  }
`
const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: min(30px, 2vw);
  @media ${theme.media.mobile} {
    width: 100%;
  }
`

export const S = {
  Messages,
  MessagesWrapper,
  FriendsWrapper,
}
