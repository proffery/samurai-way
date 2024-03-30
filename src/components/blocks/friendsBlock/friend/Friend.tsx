import { UserResponse } from "api/usersAPI"
import { Patch } from "components/app/Router/routeNames"
import { memo } from "react"
import { S } from "./Friend_Styles"

type Props = {
  friendData: UserResponse
}

export const Friend: React.FC<Props> = memo((props) => {
  return (
    <S.Friend to={Patch.Profile + props.friendData.id}>
      <S.Photo avatarURL={props.friendData.photos.small} />
      <S.Name>{props.friendData.name}</S.Name>
    </S.Friend>
  )
})
