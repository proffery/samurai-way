import { v1 } from "uuid"
import { UserStateType } from "../../../redux/usersReducer"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"

type UsersBlockPropsType = {
    users: UserStateType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserStateType[]) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: v1(),
                fullName: 'Dmitry',
                photoUrl: 'https://ict2go.ru/uploads/media/speakers_lid_image/0001/29/thumb_28624_speakers_lid_image_big.jpeg',
                status: 'I am a boss!',
                location: { city: 'Minsk', country: 'Belarus' },
                isFollowed: false
            },
            {
                id: v1(),
                fullName: 'Victor',
                photoUrl: 'https://i.ytimg.com/vi/esQARNPC3vY/sddefault.jpg',
                status: 'And I am a boss!',
                location: { city: 'Minsk', country: 'Belarus' },
                isFollowed: true
            },
            {
                id: v1(),
                fullName: 'Sveta',
                photoUrl: 'https://i.ytimg.com/vi/QxlejW_wtJY/maxresdefault.jpg',
                status: 'I am so pretty',
                location: { city: 'Minsk', country: 'Belarus' },
                isFollowed: false
            },
        ])
    }

    const usersList = () => {
        return (
            <>
                {props.users.map(user =>
                    <User
                        key={user.id}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        user={user}
                    />
                )}
            </>
        )
    }

    return (
        <StyledUsersBlock id="all-users">
            <BlockHeader>Users</BlockHeader>
            {usersList()}
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 82%;
    min-width: 60%;
    max-height: 100vh;
    overflow-y: auto;
`
