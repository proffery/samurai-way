import { Avatar } from 'components/common/avatar/Avatar'
import { Button } from 'components/common/button/Button'
import { memo, MouseEvent } from 'react'
import { UserStateType } from 'store/users/usersReducer'
import { S } from './User_Styles'
import { Patch } from 'components/app/Router/routeNames'

type Props = {
    user: UserStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<Props> = memo((props) => {
    const { id: userId, followed, status, isLoading, name, photos } = props.user
    const { follow, unfollow } = props

    const followUnfollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        return followed ? unfollow(userId) : follow(userId)
    }
    return <S.User to={Patch.Profile + userId}>
        <S.Info >
            <S.Photo>
                <Avatar avatarURL={photos.small} />
                <S.Name>{name + ' '}</S.Name>
            </S.Photo>
            {status ? <S.Status>{status + ' '}</S.Status> : <S.Status></S.Status>}
        </S.Info>
        <S.Container>
            <Button
                ariaLabel={`${followed ? 'Unfollow' : 'Follow'} button`}
                variant={followed ? 'primary' : 'outlined'}
                onClick={followUnfollowHandler}
                disabled={isLoading}
            >{followed ? 'UNFOLLOW' : 'FOLLOW'}</Button>
        </S.Container>
    </S.User>
})