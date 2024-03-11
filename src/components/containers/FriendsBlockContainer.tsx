import { memo, useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { FriendsType, getFriends } from "../../store/friends/friendsReducer"
import { AppRootStateType } from "../../store/redux-store"
import { FriendsBlock } from "../blocks/friendsBlock/FriendsBlock"
import { selectIsLoading } from 'store/app/appSelectors'
import { selectFriendsData } from 'store/friends/friendsSelectors'

type FriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}
export const FriendsBlockAPI: React.FC<FriendsBlockAPIPropsType> = memo((props) => {
    const { totalUsersCount, usersOnPage } = props.friendsData
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
            isLoading={props.isLoading}
            friendsData={props.friendsData}
            blockHeaderName={"Friends"}
            refreshFriends={refreshFriends}
            onPageChangeHandler={onPageChangeHandler}
        />
    )
})


type MapStatePropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoading: selectIsLoading(state),
        friendsData: selectFriendsData(state),
    }
}

export const FriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(FriendsBlockAPI)