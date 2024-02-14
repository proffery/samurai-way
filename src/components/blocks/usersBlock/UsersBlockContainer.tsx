
import { connect } from "react-redux"
import { UsersBlock } from "./UsersBlock"
import {
    getAllUsersTC, followUsersTC, unfollowUsersTC, getFollowedUsersTC,
    getUnfollowedUsersTC, UsersFilterType, changeUsersFilterAC, UserStateType
} from "../../../redux/usersReducer"
import { AppRootStateType } from "../../../redux/redux-store"
import { useEffect } from "react"
import { RequestStatusType } from "../../../redux/appReducer"

type UsersBlockAPIPropsType = {
    users: UserStateType[]
    usersFilter: UsersFilterType
    totalUsersCount: number
    usersOnPage: number
    currentPage: number
    appRequestStatus: RequestStatusType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getAllUsers: (currentPage: number, usersOnPage: number) => void
    getFollowedUsers: (currentPage: number, usersOnPage: number) => void
    getUnfollowedUsers: (currentPage: number, usersOnPage: number) => void
    changeUsersFilter: (filter: UsersFilterType) => void
}

export const UsersBlockAPI: React.FC<UsersBlockAPIPropsType> = (props) => {

    useEffect(() => {
        switch (props.usersFilter) {
            case "all":
                props.getAllUsers(1, props.usersOnPage)
                break
            case "followed":
                props.getFollowedUsers(1, props.usersOnPage)
                break
            case "unfollowed":
                props.getUnfollowedUsers(1, props.usersOnPage)
                break
            default:
                props.getAllUsers(1, props.usersOnPage)
        }

    }, [props.usersFilter])

    const filterChangeHandler = (filter: UsersFilterType) => {
        props.changeUsersFilter(filter)
    }

    const onPageChangeHandler = (pageNumber: number) => {
        switch (props.usersFilter) {
            case "all":
                props.getAllUsers(pageNumber, props.usersOnPage)
                break
            case "followed":
                props.getFollowedUsers(pageNumber, props.usersOnPage)
                break
            case "unfollowed":
                props.getUnfollowedUsers(pageNumber, props.usersOnPage)
                break
            default:
                props.getAllUsers(pageNumber, props.usersOnPage)
        }
    }

    return (
        <UsersBlock
            users={props.users}
            usersFilter={props.usersFilter}
            currentPage={props.currentPage}
            totalUsersCount={props.totalUsersCount}
            usersOnPage={props.usersOnPage}
            appRequestStatus={props.appRequestStatus}
            follow={props.follow}
            unfollow={props.unfollow}
            getAllUsers={props.getAllUsers}
            onPageChangeHandler={onPageChangeHandler}
            filterChangeHandler={filterChangeHandler}
        />
    )
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.users.users,
        totalUsersCount: state.users.totalUsersCount,
        usersOnPage: state.users.usersOnPage,
        currentPage: state.users.currentPage,
        usersFilter: state.users.usersFilter,
        appRequestStatus: state.app.requestStatus
    }
}

export const UsersBlockContainer = connect(mapStateToProps, {
    follow: followUsersTC,
    unfollow: unfollowUsersTC,
    getAllUsers: getAllUsersTC,
    getFollowedUsers: getFollowedUsersTC,
    getUnfollowedUsers: getUnfollowedUsersTC,
    changeUsersFilter: changeUsersFilterAC
})(UsersBlockAPI)