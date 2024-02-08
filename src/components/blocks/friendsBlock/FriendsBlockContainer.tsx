import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { FriendsBlock } from "./FriendsBlock";
import { getFriendsTC } from "../../../redux/friendsReducer";
import { UserStateType } from "../../../api/social-network-api";
import { useEffect } from "react";


type FriendsBlockAPIPropsType = {
    className?: string
    friends: UserStateType[]
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
    getFriends: (currentPage: number, usersOnPage: number) => void
}


export const FriendsBlockAPI: React.FC<FriendsBlockAPIPropsType> = (props) => {
    const pagesCount = Math.ceil(props.totalFriendsCount / props.friendsOnPage)
    
    useEffect(() => {
        props.getFriends(props.currentPage, props.friendsOnPage)
    }, [])

    useEffect(() => {
        const randomPage = getRandomPage(1, pagesCount)
        console.log(randomPage);
        props.getFriends(randomPage, props.friendsOnPage)
    }, [pagesCount])

    function getRandomPage(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
    }

    return (
        <FriendsBlock
            friends={props.friends}
            blockHeaderName={"Friends"}
            className={props.className}
        />
    )
}


type MapStatePropsType = {
    className?: string
    friends: UserStateType[]
    totalFriendsCount: number
    friendsOnPage: number
    currentPage: number
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        friends: state.friends.users,
        currentPage: state.friends.currentPage,
        friendsOnPage: state.friends.usersOnPage,
        totalFriendsCount: state.friends.totalUsersCount
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFriends: (currentPage: number, usersOnPage: number) => {
            dispatch(getFriendsTC(currentPage, usersOnPage))
        }
    }
}

export const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlockAPI)