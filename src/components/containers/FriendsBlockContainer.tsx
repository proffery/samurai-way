import { compose } from 'redux'
import { connect } from 'react-redux'
import { memo, useEffect } from 'react'
import { AppRootStateType } from 'store/redux-store'
import { selectIsLoading } from 'store/app/appSelectors'
import { getFriends } from 'store/friends/friendsReducer'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import {
    selectFriendsCurrentPage, selectFriends, selectTotalFriendsCount,
    selectFriendsOnPage
} from 'store/friends/friendsSelectors'
import { UserResponseType } from 'api/usersAPI'

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
            users={friends}
            isLoading={isLoading}
            usersOnPage={usersOnPage}
            currentPage={currentPage}
            blockHeaderName={"Friends"}
            className={props.className}
            totalUsersCount={totalUsersCount}
            refreshFriends={refreshFriends}
            onPageChangeHandler={onPageChangeHandler}
        />
    )
})


const mapStateToProps = (state: AppRootStateType) => {
    return {
        friends: selectFriends(state),
        isLoading: selectIsLoading(state),
        usersOnPage: selectFriendsOnPage(state),
        currentPage: selectFriendsCurrentPage(state),
        totalUsersCount: selectTotalFriendsCount(state),
    }
}

export const FriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(FriendsBlockAPI)

//TYPES
type FriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    friends: UserResponseType[]
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}