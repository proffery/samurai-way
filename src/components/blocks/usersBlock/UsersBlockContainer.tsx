
import { connect } from "react-redux"
import { UsersBlock } from "./UsersBlock"
import { getUsersTC, UsersReducerThunksType, followUsersTC, unfollowUsersTC } from "../../../redux/usersReducer"
import { AppRootStateType } from "../../../redux/redux-store"


const mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch: (dispatch: any) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followUsersTC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowUsersTC(userId))
        },
        getUsers: () => {
            dispatch(getUsersTC())
        }
    }
}

export const UsersBlockContainer = connect(mapStateToProps, mapDispatchToProps)(UsersBlock)