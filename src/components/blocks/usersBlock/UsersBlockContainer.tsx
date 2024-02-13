
import { connect } from "react-redux"
import { UsersBlock } from "./UsersBlock"
import { getUsersTC, followUsersTC, unfollowUsersTC } from "../../../redux/usersReducer"
import { AppRootStateType } from "../../../redux/redux-store"
import { UserStateType } from "../../../api/social-network-api"
import { useEffect } from "react"

type UsersBlockAPIPropsType = {
    users: UserStateType[]
    totalUsersCount: number
    usersOnPage: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
}

export const UsersBlockAPI: React.FC<UsersBlockAPIPropsType> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.usersOnPage)
    }, [])

    const pagesCount = Math.ceil(props.totalUsersCount / props.usersOnPage)
    const pagesCountArray = Array.from({ length: pagesCount }, (_, i) => i + 1)

    const onPageChangeHandler = (pageNumber: number) => {
        props.getUsers(pageNumber, props.usersOnPage)
    }

    return (
        <UsersBlock
            users={props.users}
            currentPage={props.currentPage}
            follow={props.follow}
            unfollow={props.unfollow}
            getUsers={props.getUsers}
            onPageChangeHandler={onPageChangeHandler}
            pagesCountArray={pagesCountArray}
        />
    )
}

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

export const UsersBlockContainer = connect(mapStateToProps, mapDispatchToProps)(UsersBlockAPI)