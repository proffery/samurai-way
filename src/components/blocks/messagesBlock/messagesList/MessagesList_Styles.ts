import { Button } from "components/common/button/Button"
import styled from "styled-components"

const MessagesList = styled.div`
  display: flex;
  min-height: fit-content;
  flex-direction: column;
  gap: min(15px, 1vw);
  overflow-y: auto;
`
const EmptyMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-bottom: min(15px, 1vw);
  overflow-y: hidden;
`
const LoadMessgesButton = styled(Button)`
  display: flex;
  min-width: 100%;
  justify-content: center;
`

export const S = {
  MessagesList,
  EmptyMessages,
  LoadMessgesButton,
}
