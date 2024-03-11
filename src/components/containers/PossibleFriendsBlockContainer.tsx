import { memo, useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { FriendsType, getFriends } from '../../store/friends/friendsReducer'
import { AppRootStateType } from "../../store/redux-store"
import { FriendsBlock } from "../blocks/friendsBlock/FriendsBlock"
import { selectIsLoading } from 'store/app/appSelectors'
import { selectPossibleFriendsData } from 'store/friends/friendsSelectors'

type PossibleFriendsBlockAPIPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    getFriends: (pageNumber: number, usersOnPage: number, isFriend: boolean) => void
}
export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = memo((props) => {
    const { totalUsersCount, usersOnPage } = props.friendsData
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
            isLoading={props.isLoading}
            friendsData={props.friendsData}
            blockHeaderName={"Potential Friends"}
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
        friendsData: selectPossibleFriendsData(state),
    }
}

export const PossibleFriendsBlockContainer = compose(
    connect(mapStateToProps, { getFriends })
)(PossibleFriendsBlockAPI)