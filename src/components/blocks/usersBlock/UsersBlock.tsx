import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { UsersPagination } from "./UsersPagination"
import { Button } from "../../micro/button/Button"
import { UserStateType, UsersFilterType } from "../../../redux/usersReducer"
import { theme } from "../../../styles/Theme.styled"


export type UsersBlockPropsType = {
    users: UserStateType[]
    usersFilter: UsersFilterType
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getAllUsers: (currentPage: number, usersOnPage: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    filterChangeHandler: (filter: UsersFilterType) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {


    const usersList = () => {
        return (
            <>
                {props.users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                )}
            </>
        )
    }

    const onAllFilterChangeHandler = () => {
        props.filterChangeHandler("all")
    }
    const onFriendsFilterChangeHandler = () => {
        props.filterChangeHandler("followed")
    }
    const onPossibleFilterChangeHandler = () => {
        props.filterChangeHandler("unfollowed")
    }

    return (
        <StyledUsersBlock id="all-users">
            <BlockHeader>Users</BlockHeader>
            <FlexWrapper justify="center" gap="20px">
                <Button 
                    variant={'link'}
                    isActive={props.usersFilter === 'all'}
                    disabled={props.appIsLoading}
                    onClick={onAllFilterChangeHandler}
                >{'All'}</Button>
                <Button 
                    variant={'link'}
                    isActive={props.usersFilter === 'followed'}
                    disabled={props.appIsLoading}
                    onClick={onFriendsFilterChangeHandler}
                >{'Followed'}</Button>
                <Button 
                    variant={'link'}
                    isActive={props.usersFilter === 'unfollowed'}
                    disabled={props.appIsLoading}
                    onClick={onPossibleFilterChangeHandler}
                >{'Unfollowed'}</Button>
            </FlexWrapper>
            {usersList()}
            <FlexWrapper justify="center" gap="10px" wrap="wrap">
                <UsersPagination
                    totalUsersCount={props.totalUsersCount}
                    usersOnPage={props.usersOnPage}
                    currentPage={props.currentPage}
                    usersFilter={props.usersFilter}
                    appIsLoading={props.appIsLoading}
                    onPageChangeHandler={props.onPageChangeHandler}
                />
            </FlexWrapper>
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 73%;
    height: 132vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
    @media ${theme.media.mobile} {
        width: 100%;
    }
`
