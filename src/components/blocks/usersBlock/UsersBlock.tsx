import { v1 } from "uuid"
import { UserStateType } from "../../../redux/usersReducer"
import { Button } from "../../micro/button/Button"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"

type UsersBlockPropsType = {
    users: UserStateType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserStateType[]) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {
    if (props.users.length === 0 ) {
        props.setUsers([
            {
                id: v1(),
                fullName: 'Dmitry',
                status: 'I am a boss!',
                location: { city: 'Minsk', country: 'Belarus' },
                isFollowed: false
            },
            {
                id: v1(),
                fullName: 'Sasha',
                status: 'And I am a boss!',
                location: { city: 'Moscow', country: 'Russia' },
                isFollowed: true
            },
            {
                id: v1(),
                fullName: 'Andrew',
                status: 'I am a boss too!',
                location: { city: 'Kiew', country: 'Ukraine' },
                isFollowed: false
            },
        ])
    }
    return (
        <BlockSection id="all-users">
            <BlockHeader>Users</BlockHeader>
            {props.users.map(user =>
                <div key={user.id}>
                    <span>{user.fullName + ' '}</span>
                    <span>{user.status + ' '}</span>
                    <span>{user.location.city + ' ' + user.location.country + ' '}</span>
                    <Button
                        variant={user.isFollowed ? 'primary' : 'outlined'}
                        onClick={user.isFollowed
                            ? () => props.unfollow(user.id)
                            : () => props.follow(user.id)}
                        name={user.isFollowed ? 'UNFOLLOW' : 'FOLLOW'}
                    />
                </div>
            )}
        </BlockSection>
    )
}