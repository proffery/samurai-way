import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { FriendsBlock } from "./FriendsBlock"
import { getFriends } from "../../../redux/friendsReducer"
import { UserResponseType } from "../../../api/social-network-api"
import { useEffect } from "react"
import { compose } from "redux"

type FriendsBlockAPIPropsType = {
    className?: string
    friends: UserResponseType[]
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
    }, [pagesCount])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }

    const refreshFriends = () => {
        props.getFriends(randomPage, props.friendsOnPage, true)
    }

    return (
        <FriendsBlock
            friends={props.friends}
            blockHeaderName={"Friends"}
            className={props.className}
            refreshFriends={refreshFriends}
        />
    )
}


type MapStatePropsType = {
    className?: string
    friends: UserResponseType[]
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        friends: state.friends.friends.users,
        currentPage: state.friends.friends.currentPage,
        friendsOnPage: state.friends.friends.usersOnPage,
        totalFriendsCount: state.friends.friends.totalUsersCount
    }
}

export const FriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(FriendsBlockAPI)