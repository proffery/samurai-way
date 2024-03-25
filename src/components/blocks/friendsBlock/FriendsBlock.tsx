import { UserResponseType } from 'api/usersAPI'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { Friend } from 'components/blocks/friendsBlock/friend/Friend'
import { Button } from 'components/common/button/Button'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { memo } from 'react'
import { S } from './FriendsBlock_Styles'

type Props = {
    className?: string
    isLoading: boolean
    users: UserResponseType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    blockHeaderName: string
    randomizeFriends: () => void
    pageChangeHandler: (pageNumber: number) => void
}

export const FriendsBlock: React.FC<Props> = memo((props) => {
    const { users, currentPage, totalUsersCount,
        className, isLoading, pageChangeHandler,
        blockHeaderName, usersOnPage, randomizeFriends } = props

    return <S.FriendsBlock
        id={blockHeaderName.toLowerCase().replaceAll(' ', '-')}
        className={className}
    >
        <FlexWrapper justify={'space-between'}>
            <Button
                onClick={randomizeFriends}
                variant={'link'}
                ariaLabel={'Randomize button'}
            >
                <BlockHeader>
                    {blockHeaderName}
                </BlockHeader>
            </Button>
        </FlexWrapper>
        <S.FriendsList>
            {users.map(friend => <Friend key={friend.id} friendData={friend} />)}
        </S.FriendsList>
        <FlexWrapper justify={'center'} direction={'row'}>
            <S.FriendsPagination
                appIsLoading={isLoading}
                currentPage={currentPage}
                totalUsersCount={totalUsersCount}
                usersOnPage={usersOnPage}
                pageChangeHandler={pageChangeHandler}
            />
        </FlexWrapper>
    </S.FriendsBlock>
})

