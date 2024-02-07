
import { connect } from "react-redux"
import { UsersBlock } from "./UsersBlock"
import { getUsersTC, followUsersTC, unfollowUsersTC } from "../../../redux/usersReducer"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.users.users,
        totalUsersCount: state.users.totalUsersCount,
        usersOnPage: state.users.usersOnPage,
        currentPage: state.users.currentPage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => {
            dispatch(followUsersTC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowUsersTC(userId))
        },
        getUsers: (currentPage: number, usersOnPage: number) => {
            dispatch(getUsersTC(currentPage, usersOnPage))
        }
    }
}

export const UsersBlockContainer = connect(mapStateToProps, mapDispatchToProps)(UsersBlock)