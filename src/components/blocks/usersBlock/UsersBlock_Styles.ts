import { BlockSection } from "components/blocks/BlockSection.styled"
import { Pagination } from "components/common/pagination/Pagination"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const UsersBlock = styled(BlockSection)`
  display: flex;
  width: 100%;
  height: 132vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 65px;
  @media ${theme.media.mobile} {
    width: 100%;
  }
`
const UsersPagination = styled(Pagination)`
  height: 1em;
`
export const S = {
  UsersBlock,
  UsersPagination,
}
