import { compose } from 'redux'
import { connect } from 'react-redux'
import { memo, useEffect } from "react"
import { AppRootStateType } from 'store/redux-store'
import { selectIsLoading } from 'store/app/appSelectors'
import { getFriends } from 'store/friends/friendsReducer'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import {
    selectPossibleFriends, selectPossibleFriendsCurrentPage, selectPossibleFriendsOnPage,
    selectTotalPossibleFriendsCount
} from 'store/friends/friendsSelectors'
import { UserResponseType } from 'api/usersAPI'

export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = memo((props) => {
    const { totalUsersCount, usersOnPage, friends, currentPage, isLoading } = props
    const pagesCount = Math.ceil(totalUsersCount / usersOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        props.getFriends(randomPage, usersOnPage, false)
    }, [])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }
    const refreshFriends = () => {
        props.getFriends(randomPage, usersOnPage, false)
    }
    const onPageChangeHandler = (pageNumber: number) => {
        props.getFriends(pageNumber, usersOnPage, false)
    }
    return (
        <FriendsBlock
            users={friends}
            isLoading={isLoading}
            usersOnPage={usersOnPage}
            currentPage={currentPage}
            className={props.className}
            totalUsersCount={totalUsersCount}
            blockHeaderName={"Might know"}
            refreshFriends={refreshFriends}
            onPageChangeHandler={onPageChangeHandler}
        />
    )
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        isLoading: selectIsLoading(state),
        friends: selectPossibleFriends(state),
        usersOnPage: selectPossibleFriendsOnPage(state),
        currentPage: selectPossibleFriendsCurrentPage(state),
        totalUsersCount: selectTotalPossibleFriendsCount(state),
    }
}

export const PossibleFriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(PossibleFriendsBlockAPI)

//TYPES
type PossibleFriendsBlockAPIPropsType = {
    isLoading: boolean
    className?: string
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    friends: UserResponseType[]
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}