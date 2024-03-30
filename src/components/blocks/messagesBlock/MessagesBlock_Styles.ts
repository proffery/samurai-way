import { BlockHeader } from "components/blocks/BlockHeader.styled"
import { BlockSection } from "components/blocks/BlockSection.styled"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const MessagesBlock = styled(BlockSection)`
  min-height: fit-content;
  max-height: 124.5vh;
  justify-content: space-between;
`
const Header = styled(BlockHeader)`
  display: flex;
  align-items: center;
  justify-content: start;
`
const ProfileLink = styled(NavLink)`
  display: flex;
  gap: 10px;
  align-items: center;
  width: min(40px, 8vw);
`
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

export const S = {
  MessagesBlock,
  Header,
  ProfileLink,
  ListWrapper,
}
