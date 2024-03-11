import { UserResponseType } from 'api/social-network-api'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { memo, useEffect } from "react"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsLoading } from 'store/app/appSelectors'
import { getFriends } from 'store/friends/friendsReducer'
import { selectPossibleFriends, selectPossibleFriendsCurrentPage, selectPossibleFriendsOnPage, selectTotalPossibleFriendsCount } from 'store/friends/friendsSelectors'
import { AppRootStateType } from 'store/redux-store'

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
            className={props.className}
            isLoading={isLoading}
            users={friends}
            currentPage={currentPage}
            totalUsersCount={totalUsersCount}
            usersOnPage={usersOnPage}
            blockHeaderName={"Potential Friends"}
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
        totalUsersCount: selectTotalPossibleFriendsCount(state),
        currentPage: selectPossibleFriendsCurrentPage(state),
    }
}

export const PossibleFriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(PossibleFriendsBlockAPI)

//TYPES
type PossibleFriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friends: UserResponseType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}