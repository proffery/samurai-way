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

export type Props = {
    usersData: UsersStateType
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    filterChangeHandler: (filter: UsersFilterType) => void
}

export const UsersBlock: React.FC<Props> = memo((props) => {
    const { usersFilter, totalUsersCount, usersOnPage,
        currentPage } = props.usersData
    const { appIsLoading, onPageChangeHandler, filterChangeHandler, unfollow, follow } = props
    const usersList = () => {
        return (
            <>
                {props.usersData.users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                    />
                )}
            </>
        )
    }

    return (
        <StyledUsersBlock >
            <BlockHeader id="users-block">Users</BlockHeader>
            <FlexWrapper justify="center" gap="20px">
                <Button
                    ariaLabel={'All filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'all'}
                    disabled={appIsLoading}
                    onClick={() => filterChangeHandler("all")}
                >{'All'}</Button>
                <Button
                    ariaLabel={'Followed filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'followed'}
                    disabled={appIsLoading}
                    onClick={() => filterChangeHandler("followed")}
                >{'Followed'}</Button>
                <Button
                    ariaLabel={'Unfollowed filter button'}
                    variant={'link'}
                    isActive={usersFilter === 'unfollowed'}
                    disabled={appIsLoading}
                    onClick={() => filterChangeHandler("unfollowed")}
                >{'Unfollowed'}</Button>
            </FlexWrapper>
            {usersList()}
            <UsersPagination
                usersOnPage={usersOnPage}
                currentPage={currentPage}
                totalUsersCount={totalUsersCount}
                appIsLoading={appIsLoading}
                onPageChangeHandler={onPageChangeHandler}
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
const UsersPagination = styled(Pagination)`
    height: 1em;
`