import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { UserResponseType } from "../../../api/social-network-api"
import { FriendsBlock } from "./FriendsBlock"
import { useEffect } from "react"
import { compose } from "redux"
import { getFriends } from '../../../redux/friendsReducer'

type PossibleFriendsBlockAPIPropsType = {
    className?: string
    possibleFriends: UserResponseType[]
    totalPossibleFriendsCount: number
    possibleFriendsOnPage: number
    currentPage: number
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}
export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = (props) => {
    const pagesCount = Math.ceil(props.totalPossibleFriendsCount / props.possibleFriendsOnPage)
    const randomPage = getRandomPage(1, pagesCount)

    useEffect(() => {
        props.getFriends(randomPage, props.possibleFriendsOnPage, false)
    }, [pagesCount])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }

    const refreshFriends = () => {
        props.getFriends(randomPage, props.possibleFriendsOnPage, false)
    }

    return (
        <FriendsBlock
            friends={props.possibleFriends}
            blockHeaderName={"Possible Friends"}
            className={props.className}
            refreshFriends={refreshFriends}
        />
    )
}

type MapStatePropsType = {
    className?: string
    possibleFriends: UserResponseType[]
    totalPossibleFriendsCount: number
    possibleFriendsOnPage: number
    currentPage: number
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        possibleFriends: state.friends.possibleFriends.users,
        currentPage: state.friends.possibleFriends.currentPage,
        possibleFriendsOnPage: state.friends.possibleFriends.usersOnPage,
        totalPossibleFriendsCount: state.friends.possibleFriends.totalUsersCount
    }
}

export const PossibleFriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(PossibleFriendsBlockAPI)