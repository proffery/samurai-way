import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { UserStateType } from "../../../api/social-network-api"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Button } from "../../micro/button/Button"

export type UsersBlockPropsType = {
    users: UserStateType[]
    currentPage: number
    pagesArray: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
    onPageChangeHandler: (pageNumber: number) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {

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
            <FlexWrapper justify="center" gap="10px" wrap="wrap">
                {props.pagesArray.length > 1 && props.pagesArray.map(el =>
                    <Button
                        variant={props.currentPage !== el ? 'outlined' : 'primary'}
                        disabled={props.currentPage !== el ? false : true}
                        onClick={() => {props.onPageChangeHandler(el)}}
                        name={el.toString()}
                    />
                )}
            </FlexWrapper>
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 85%;
    min-width: 70%;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
`
