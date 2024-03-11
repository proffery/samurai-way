import { UserResponseType } from 'api/social-network-api'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsLoading } from 'store/app/appSelectors'
import { getFriends } from 'store/friends/friendsReducer'
import { selectFriendsCurrentPage, selectFriends, selectTotalFriendsCount, selectFriendsOnPage } from 'store/friends/friendsSelectors'
import { AppRootStateType } from 'store/redux-store'

export const FriendsBlockAPI: React.FC<FriendsBlockAPIPropsType> = memo((props) => {
    const { totalUsersCount, usersOnPage, friends, currentPage, isLoading } = props
    const pagesCount = Math.ceil(totalUsersCount / usersOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        props.getFriends(randomPage, usersOnPage, true)
    }, [])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }
    const refreshFriends = () => {
        props.getFriends(randomPage, usersOnPage, true)
    }
    const onPageChangeHandler = (pageNumber: number) => {
        props.getFriends(pageNumber, usersOnPage, true)
    }
    return (
        <FriendsBlock
            className={props.className}
            isLoading={isLoading}
            users={friends}
            currentPage={currentPage}
            totalUsersCount={totalUsersCount}
            usersOnPage={usersOnPage}
            blockHeaderName={"Friends"}
            refreshFriends={refreshFriends}
            onPageChangeHandler={onPageChangeHandler}
        />
    )
})


const mapStateToProps = (state: AppRootStateType) => {
    return {
        isLoading: selectIsLoading(state),
        friends: selectFriends(state),
        usersOnPage: selectFriendsOnPage(state),
        totalUsersCount: selectTotalFriendsCount(state),
        currentPage: selectFriendsCurrentPage(state),
    }
}

export const FriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(FriendsBlockAPI)

//TYPES
type FriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friends: UserResponseType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}