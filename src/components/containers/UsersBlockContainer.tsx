
import { connect } from "react-redux"
import { UsersBlock } from "../blocks/usersBlock/UsersBlock"
import {
    getAllUsers, followUser, unfollowUser, getFollowedUsers,
    getUnfollowedUsers, UsersFilterType, changeUsersFilter,
    UsersStateType
} from 'store/users/usersReducer'
import { memo, useEffect } from "react"
import { compose } from "redux"
import { selectUsersData } from 'store/users/usersSelectors'
import { selectIsLoading } from 'store/app/appSelectors'
import { AppRootStateType } from 'store/redux-store'

const UsersBlockAPI: React.FC<UsersBlockAPIPropsType> = memo((props) => {
    const { usersFilter, usersOnPage } = props.usersData
    useEffect(() => {
        switch (usersFilter) {
            case "all":
                props.getAllUsers(1, usersOnPage)
                break
            case "followed":
                props.getFollowedUsers(1, usersOnPage)
                break
            case "unfollowed":
                props.getUnfollowedUsers(1, usersOnPage)
                break
            default:
                props.getAllUsers(1, usersOnPage)
        }

    }, [usersFilter])

    const filterChangeHandler = (filter: UsersFilterType) => {
        props.changeUsersFilter(filter)
    }

    const onPageChangeHandler = (pageNumber: number) => {
        switch (usersFilter) {
            case "all":
                props.getAllUsers(pageNumber, usersOnPage)
                break
            case "followed":
                props.getFollowedUsers(pageNumber, usersOnPage)
                break
            case "unfollowed":
                props.getUnfollowedUsers(pageNumber, usersOnPage)
                break
            default:
                props.getAllUsers(pageNumber, usersOnPage)
        }
    }

    return (
        <UsersBlock
            usersData={props.usersData}
            appIsLoading={props.appIsLoading}
            follow={props.followUser}
            unfollow={props.unfollowUser}
            getAllUsers={props.getAllUsers}
            onPageChangeHandler={onPageChangeHandler}
            filterChangeHandler={filterChangeHandler}
        />
    )
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        usersData: selectUsersData(state),
        appIsLoading: selectIsLoading(state)
    }
}

export const UsersBlockContainer = compose(
    connect(mapStateToProps, {
        followUser, unfollowUser, getAllUsers,
        getFollowedUsers, getUnfollowedUsers, changeUsersFilter
    })
)(UsersBlockAPI)

//TYPES
type UsersBlockAPIPropsType = {
    usersData: UsersStateType
    appIsLoading: boolean
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    getAllUsers: (currentPage: number, usersOnPage: number) => void
    getFollowedUsers: (currentPage: number, usersOnPage: number) => void
    getUnfollowedUsers: (currentPage: number, usersOnPage: number) => void
    changeUsersFilter: (filter: UsersFilterType) => void
}