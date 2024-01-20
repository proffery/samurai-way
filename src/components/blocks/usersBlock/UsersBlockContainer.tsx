
import { connect } from "react-redux"
import { UsersBlock } from "./UsersBlock"
import { UsersReducerActionsType, UserStateType, followAC, unfollowAC, setUsersAC } from "../../../redux/usersReducer"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch: (action: UsersReducerActionsType) => void) => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UserStateType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersBlockContainer = connect(mapStateToProps, mapDispatchToProps)(UsersBlock)