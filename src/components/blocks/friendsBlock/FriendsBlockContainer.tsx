import { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { FriendsType, getFriends } from "../../../redux/friendsReducer"
import { AppRootStateType } from "../../../redux/redux-store"
import { FriendsBlock } from "./FriendsBlock"

type FriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}
export const FriendsBlockAPI: React.FC<FriendsBlockAPIPropsType> = (props) => {
    const pagesCount = Math.ceil(props.totalFriendsCount / props.friendsOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        props.getFriends(randomPage, props.friendsOnPage, true)
    }, [])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }
    const refreshFriends = () => {
        props.getFriends(randomPage, props.friendsOnPage, true)
    }
    const onPageChangeHandler = (pageNumber: number) => {
        props.getFriends(pageNumber, props.friendsOnPage, true)
    }
    return (
        <FriendsBlock
            className={props.className}
            isLoading={props.isLoading}
            friendsData={props.friendsData}
            blockHeaderName={"Friends"}
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
        friendsData: state.friends.friends,
        currentPage: state.friends.friends.currentPage,
        friendsOnPage: state.friends.friends.usersOnPage,
        totalFriendsCount: state.friends.friends.totalUsersCount
    }
}

export const FriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(FriendsBlockAPI)