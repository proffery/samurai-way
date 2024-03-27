import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { UsersBlock } from 'components/blocks/usersBlock/UsersBlock'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo } from "react"
import { S } from './Users_Styles'

const Users: React.FC = memo(() => {
    return <S.Users id="users">
        <ToTop anchor_id='users-block' />
        <UsersBlock />
        <S.Wrapper>
            <FriendsBlock headerName='Friends' />
            <FriendsBlock headerName='Might know' isFriends={false} />
        </S.Wrapper>
    </S.Users>
})

export default Users