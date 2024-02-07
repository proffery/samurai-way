import { useEffect } from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { UserStateType } from "../../../api/social-network-api"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Button } from "../../micro/button/Button"

export type UsersBlockPropsType = {
    users: UserStateType[]
    totalUsersCount: number
    usersOnPage: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {

    useEffect(() => {
        props.getUsers(props.currentPage, props.usersOnPage)
    }, [])

    const pagesCount = Math.ceil(props.totalUsersCount / props.usersOnPage)
    const pagesArray = Array.from({ length: pagesCount }, (_, i) => i + 1)

    const onPageChangeHandler = (pageNumber: number) => {
        props.getUsers(pageNumber, props.usersOnPage)
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
            <FlexWrapper justify="center" gap="10px" wrap="wrap">
                {pagesArray.length > 1 && pagesArray.map(el =>
                    <Button
                        variant={props.currentPage !== el ? 'outlined' : 'primary'}
                        disabled={props.currentPage !== el ? false : true}
                        onClick={() => {onPageChangeHandler(el)}}
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
    min-width: 60%;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
`
