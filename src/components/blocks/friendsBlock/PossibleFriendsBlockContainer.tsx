import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { getPossibleFriendsTC } from "../../../redux/possibleFriendsReducer";
import { UserResponseType } from "../../../api/social-network-api";
import { FriendsBlock } from "./FriendsBlock";
import { useEffect } from "react";

type PossibleFriendsBlockAPIPropsType = {
    className?: string
    possibleFriends: UserResponseType[]
    totalPossibleFriendsCount: number
    possibleFriendsOnPage: number
    currentPage: number
    getPossibleFriends: (currentPage: number, possibleFriendsOnPage: number) => void
}


export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = (props) => {
    const pagesCount = Math.ceil(props.totalPossibleFriendsCount / props.possibleFriendsOnPage)

    useEffect(() => {
        const randomPage = getRandomPage(1, pagesCount)
        props.getPossibleFriends(randomPage, props.possibleFriendsOnPage)
    }, [pagesCount])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }

    return (
        <FriendsBlock
            friends={props.possibleFriends}
            blockHeaderName={"Possible Friends"}
            className={props.className}
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
        possibleFriends: state.possibleFriends.users,
        currentPage: state.possibleFriends.currentPage,
        possibleFriendsOnPage: state.possibleFriends.usersOnPage,
        totalPossibleFriendsCount: state.possibleFriends.totalUsersCount
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPossibleFriends: (currentPage: number, possibleFriendsOnPage: number) => {
            dispatch(getPossibleFriendsTC(currentPage, possibleFriendsOnPage))
        },
    }
}

export const PossibleFriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(PossibleFriendsBlockAPI)