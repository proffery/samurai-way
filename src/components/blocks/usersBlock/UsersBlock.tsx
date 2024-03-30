import { BlockHeader } from "components/blocks/BlockHeader.styled"
import { User } from "components/blocks/usersBlock/user/User"
import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { Button } from "components/common/button/Button"
import { memo, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAppIsLoading } from "store/app/appSelectors"
import { selectUsersData } from "store/users/usersSelectors"
import { useActions } from "utils/customHooks/useActions"
import { S } from "./UsersBlock_Styles"

export const UsersBlock: React.FC = memo(() => {
    const usersData = useSelector(selectUsersData)
    const { usersFilter, usersOnPage, searchTerm, currentPage, totalUsersCount } = usersData
    const appIsLoading = useSelector(selectAppIsLoading)
    const { getUsers, changeUsersFilter, followUser, unfollowUser } = useActions()

    useEffect(() => {
        switch (usersFilter) {
            case "all":
                getUsers(1, usersOnPage, null, searchTerm)
                break
            case "followed":
                getUsers(1, usersOnPage, true, searchTerm)
                break
            case "unfollowed":
                getUsers(1, usersOnPage, false, searchTerm)
                break
            default:
                getUsers(1, usersOnPage, null, searchTerm)
        }
    }, [usersFilter, searchTerm])

    const pageChangeHandler = (pageNumber: number) => {
        switch (usersFilter) {
            case "all":
                getUsers(pageNumber, usersOnPage, null, searchTerm)
                break
            case "followed":
                getUsers(pageNumber, usersOnPage, true, searchTerm)
                break
            case "unfollowed":
                getUsers(pageNumber, usersOnPage, false, searchTerm)
                break
            default:
                getUsers(pageNumber, usersOnPage, null, searchTerm)
        }
    }
    const usersList = () => {
        return (
            <>
                {usersData.users.map((user) => (
                    <User key={user.id} user={user} follow={followUser} unfollow={unfollowUser} />
                ))}
            </>
        )
    }

    return (
        <S.UsersBlock>
            <BlockHeader id="users-block">Users</BlockHeader>
            <FlexWrapper justify="center" gap="20px">
                <Button
                    ariaLabel={"All filter button"}
                    variant={"link"}
                    isActive={usersFilter === "all"}
                    disabled={appIsLoading}
                    onClick={() => changeUsersFilter("all")}
                >
                    {"All"}
                </Button>
                <Button
                    ariaLabel={"Followed filter button"}
                    variant={"link"}
                    isActive={usersFilter === "followed"}
                    disabled={appIsLoading}
                    onClick={() => changeUsersFilter("followed")}
                >
                    {"Followed"}
                </Button>
                <Button
                    ariaLabel={"Unfollowed filter button"}
                    variant={"link"}
                    isActive={usersFilter === "unfollowed"}
                    disabled={appIsLoading}
                    onClick={() => changeUsersFilter("unfollowed")}
                >
                    {"Unfollowed"}
                </Button>
            </FlexWrapper>
            {usersList()}
            <S.UsersPagination
                pagesPortion={7}
                usersOnPage={usersOnPage}
                currentPage={currentPage}
                appIsLoading={appIsLoading}
                totalUsersCount={totalUsersCount}
                pageChangeHandler={pageChangeHandler}
            />
        </S.UsersBlock>
    )
})
