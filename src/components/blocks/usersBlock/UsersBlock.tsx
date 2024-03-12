import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { User } from 'components/blocks/usersBlock/user/User'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Button } from 'components/common/button/Button'
import { Pagination } from 'components/common/pagination/Pagination'
import { memo } from 'react'
import { UsersFilterType, UsersStateType } from 'store/users/usersReducer'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

export type UsersBlockPropsType = {
    usersData: UsersStateType
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    filterChangeHandler: (filter: UsersFilterType) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = memo((props) => {
    const { usersFilter, totalUsersCount, usersOnPage, currentPage } = props.usersData
    const usersList = () => {
        return (
            <>
                {props.usersData.users.map(user =>
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
        <StyledUsersBlock >
            <BlockHeader id="users-block">Users</BlockHeader>
            <FlexWrapper justify="center" gap="20px">
                <Button
                    ariaLabel={'All filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'all'}
                    disabled={props.appIsLoading}
                    onClick={onAllFilterChangeHandler}
                >{'All'}</Button>
                <Button
                    ariaLabel={'Followed filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'followed'}
                    disabled={props.appIsLoading}
                    onClick={onFriendsFilterChangeHandler}
                >{'Followed'}</Button>
                <Button
                    ariaLabel={'Unfollowed filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'unfollowed'}
                    disabled={props.appIsLoading}
                    onClick={onPossibleFilterChangeHandler}
                >{'Unfollowed'}</Button>
            </FlexWrapper>
            {usersList()}
            <Pagination
                totalUsersCount={totalUsersCount}
                usersOnPage={usersOnPage}
                currentPage={currentPage}
                appIsLoading={props.appIsLoading}
                onPageChangeHandler={props.onPageChangeHandler}
                pagesNumber={8}
            />
        </StyledUsersBlock>
    )
})

const StyledUsersBlock = styled(BlockSection)`
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