import { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { FriendsType, getFriends } from '../../../redux/friendsReducer'
import { AppRootStateType } from "../../../redux/redux-store"
import { FriendsBlock } from "./FriendsBlock"

type PossibleFriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}
export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = (props) => {
    const pagesCount = Math.ceil(props.totalFriendsCount / props.friendsOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        props.getFriends(randomPage, props.friendsOnPage, false)
    }, [])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }
    const refreshFriends = () => {
        props.getFriends(randomPage, props.friendsOnPage, false)
    }
    const onPageChangeHandler = (pageNumber: number) => {
        props.getFriends(pageNumber, props.friendsOnPage, false)
    }
    return (
        <FriendsBlock
            className={props.className}
            isLoading={props.isLoading}
            friendsData={props.friendsData}
            blockHeaderName={"Possible Friends"}
            refreshFriends={refreshFriends}
            onPageChangeHandler={onPageChangeHandler}
        />
    )
}

type MapStatePropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoading: state.app.isLoading,
        friendsData: state.friends.possibleFriends,
        currentPage: state.friends.possibleFriends.currentPage,
        friendsOnPage: state.friends.possibleFriends.usersOnPage,
        totalFriendsCount: state.friends.possibleFriends.totalUsersCount
    }
}

export const PossibleFriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(PossibleFriendsBlockAPI)