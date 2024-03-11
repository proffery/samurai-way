import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Friend } from 'components/blocks/friendsBlock/friend/Friend'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Button } from 'components/common/button/Button'
import { Icon } from 'components/common/icon/Icon'
import { Pagination } from 'components/common/pagination/Pagination'
import { memo } from 'react'
import { FriendsType } from 'store/friends/friendsReducer'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'



type FriendsBlockPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    blockHeaderName: string
    refreshFriends: () => void
    onPageChangeHandler: (pageNumber: number) => void
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = memo((props) => {
    const { users, currentPage, totalUsersCount, usersOnPage } = props.friendsData
    const { isLoading, onPageChangeHandler } = props
    const friendsList = () => {
        return (
            <StyledFriendsList>
                {users.map(friend => <Friend key={friend.id} friendData={friend} />)}
            </StyledFriendsList>
        )
    }

    return (
        <StyledFriends
            id={props.blockHeaderName.toLowerCase().replaceAll(' ', '-')}
            className={props.className}
        >
            <FlexWrapper justify={'space-between'}>
                <BlockHeader>
                    {props.blockHeaderName}
                </BlockHeader>
                <RefreshButton
                    onClick={props.refreshFriends}
                    variant={'link'}
                    className={props.className}
                >
                    <Icon iconId={'refresh'} viewBox='0 -6 32 32' />
                </RefreshButton>
            </FlexWrapper>
            {friendsList()}
            <FlexWrapper justify={'center'} direction={'row'}>
                <StyledPagination
                    appIsLoading={isLoading}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    usersOnPage={usersOnPage}
                    onPageChangeHandler={onPageChangeHandler}
                    pagesNumber={3}
                />
            </FlexWrapper>
        </StyledFriends>
    )
})
const StyledFriends = styled(BlockSection)`
    width: 100%;
    display: flex;
`
const StyledFriendsList = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    @media ${theme.media.mobile} {
        flex-direction: row;
    }
`
const StyledPagination = styled(Pagination)`
    ${font({ weight: 400, Fmin: 11, Fmax: 16 })}
`
const RefreshButton = styled(Button)`
    max-width: 24px;
    max-height: 24px;
`
