import { memo } from 'react'
import { font } from 'styles/Font'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { Icon } from 'components/common/icon/Icon'
import { Button } from 'components/common/button/Button'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Pagination } from 'components/common/pagination/Pagination'
import { Friend } from 'components/blocks/friendsBlock/friend/Friend'
import { UserResponseType } from 'api/usersAPI'

type Props = {
    className?: string
    isLoading: boolean
    users: UserResponseType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    blockHeaderName: string
    refreshFriends: () => void
    onPageChangeHandler: (pageNumber: number) => void
}

export const FriendsBlock: React.FC<Props> = memo((props) => {
    const { users, currentPage, totalUsersCount, usersOnPage,
        className, isLoading, onPageChangeHandler,
        blockHeaderName, refreshFriends } = props
        
    const friendsList = () => {
        return (
            <StyledFriendsList>
                {users.map(friend => <Friend key={friend.id} friendData={friend} />)}
            </StyledFriendsList>
        )
    }

    return (
        <StyledFriends
            id={blockHeaderName.toLowerCase().replaceAll(' ', '-')}
            className={className}
        >
            <FlexWrapper justify={'space-between'}>
                <Button
                    onClick={refreshFriends}
                    variant={'link'}
                    className={className}
                    ariaLabel={'Refresh button'}
                >
                    <BlockHeader>
                        {blockHeaderName}
                    </BlockHeader>
                </Button>
            </FlexWrapper>
            {friendsList()}
            <FlexWrapper justify={'center'} direction={'row'}>
                <StyledPagination
                    appIsLoading={isLoading}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    usersOnPage={usersOnPage}
                    onPageChangeHandler={onPageChangeHandler}
                    pagesNumber={2}
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
    ${font({ weight: 700, Fmin: 10, Fmax: 12 })}
    height: 1em;

`