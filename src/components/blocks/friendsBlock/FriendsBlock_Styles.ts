import { BlockSection } from "components/blocks/BlockSection.styled"
import { Pagination } from "components/common/pagination/Pagination"
import styled from "styled-components"
import { font } from "styles/Font"
import { theme } from "styles/Theme.styled"

const FriendsBlock = styled(BlockSection)`
  display: flex;
`
const FriendsList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  @media ${theme.media.mobile} {
    flex-direction: row;
  }
`
const FriendsPagination = styled(Pagination)`
  ${font({ weight: 700, Fmin: 10, Fmax: 13 })}
  height: 1em;
`

export const S = {
  FriendsBlock,
  FriendsList,
  FriendsPagination,
}
