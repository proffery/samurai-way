import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { Friend } from 'components/blocks/friendsBlock/friend/Friend'
import { Button } from 'components/common/button/Button'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { memo, useEffect } from 'react'
import { S } from './FriendsBlock_Styles'
import { useActions } from 'utils/customHooks/useActions'
import { useSelector } from 'react-redux'
import { selectFriendsData, selectPossibleFriendsData } from 'store/friends/friendsSelectors'
import { selectAppIsLoading } from 'store/app/appSelectors'

type Props = {
    className?: string
    isFriends?: boolean
    blockHeaderName: string
}

export const FriendsBlock: React.FC<Props> = memo(({ blockHeaderName, className, isFriends = true }) => {
    const { getFriends } = useActions()
    const { totalUsersCount, currentPage, usersOnPage, users } = useSelector(isFriends ? selectFriendsData : selectPossibleFriendsData)
    const isLoading = useSelector(selectAppIsLoading)
    const pagesCount = Math.ceil(totalUsersCount / usersOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        getFriends(randomPage, usersOnPage, isFriends)
    }, [])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }
    const randomizeFriends = () => {
        getFriends(randomPage, usersOnPage, isFriends)
    }
    const pageChangeHandler = (pageNumber: number) => {
        getFriends(pageNumber, usersOnPage, isFriends)
    }

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
                pagesPortion={2}
                pageChangeHandler={pageChangeHandler}
            />
        </FlexWrapper>
    </S.FriendsBlock>
})

