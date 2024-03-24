
import { UsersBlock } from 'components/blocks/usersBlock/UsersBlock'
import { memo, useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { selectAppIsLoading } from 'store/app/appSelectors'
import { AppRootStateType } from 'store/redux-store'
import {
    UsersFilterType,
    UsersStateType,
    changeUsersFilter,
    followUser,
    getUsers,
    unfollowUser
} from 'store/users/usersReducer'
import { selectUsersData } from 'store/users/usersSelectors'

const UsersBlockAPI: React.FC<UsersBlockAPIPropsType> = memo((props) => {
    const { usersFilter, usersOnPage, searchTerm } = props.usersData
    useEffect(() => {
        switch (usersFilter) {
            case "all":
                props.getUsers(1, usersOnPage, null, searchTerm)
                break
            case "followed":
                props.getUsers(1, usersOnPage, true, searchTerm)
                break
            case "unfollowed":
                props.getUsers(1, usersOnPage, false, searchTerm)
                break
            default:
                props.getUsers(1, usersOnPage, null, searchTerm)
        }

    }, [usersFilter, searchTerm])

    const filterChangeHandler = (filter: UsersFilterType) => {
        props.changeUsersFilter(filter)
    }

    const onPageChangeHandler = (pageNumber: number) => {
        switch (usersFilter) {
            case "all":
                props.getUsers(pageNumber, usersOnPage, null, searchTerm)
                break
            case "followed":
                props.getUsers(pageNumber, usersOnPage, true, searchTerm)
                break
            case "unfollowed":
                props.getUsers(pageNumber, usersOnPage, false, searchTerm)
                break
            default:
                props.getUsers(pageNumber, usersOnPage, null, searchTerm)
        }
    }

    return (
        <UsersBlock
            usersData={props.usersData}
            appIsLoading={props.appIsLoading}
            follow={props.followUser}
            unfollow={props.unfollowUser}
            onPageChangeHandler={onPageChangeHandler}
            filterChangeHandler={filterChangeHandler}
        />
    )
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        usersData: selectUsersData(state),
        appIsLoading: selectAppIsLoading(state)
    }
}

export const UsersBlockContainer = compose(
    connect(mapStateToProps, {
        followUser, unfollowUser, getUsers, changeUsersFilter
    })
)(UsersBlockAPI)

//TYPES
type UsersBlockAPIPropsType = {
    appIsLoading: boolean
    usersData: UsersStateType
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    changeUsersFilter: (filter: UsersFilterType) => void
    getUsers: (currentPage: number, usersOnPage: number, isFriend: boolean | null, searchTerm: string) => void
}