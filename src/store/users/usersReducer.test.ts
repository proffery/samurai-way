import {
    UserState,
    UsersFilter,
    UsersReducerActions,
    UsersState,
    changeUserIsLoading,
    changeUsersFilter,
    initialState,
    setFollowUser,
    setTotalUsersCount,
    setUnfollowUser,
    setUsers,
    setUsersOnPage,
    setUsersSearchTerm,
    usersReducer,
} from "./usersReducer"
import { v1 } from "uuid"
import { cleanReducer } from "store/auth/authReducer"
import { UserResponse } from "api/usersAPI"

describe("Users reducer", () => {
    it("user reducer should return the initial state", () => {
        expect(usersReducer(undefined, {} as UsersReducerActions)).toEqual(initialState)
    })

    it('should update the followed status of a user to "TRUE"', () => {
        const userId = 1
        const users: UserState[] = [
            {
                id: 1,
                name: "John Doe",
                status: "Active",
                followed: false,
                uniqueUrlName: "johndoe",
                photos: {
                    small: "https://example.com/user1_small.jpg",
                    large: "https://example.com/user1_large.jpg",
                },
                isLoading: false,
            },
            {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: false,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                },
                isLoading: false,
            },
        ]
        const startState: UsersState = { ...initialState, users: users }
        const action = setFollowUser(userId)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.users[0].followed).toBe(true)
        expect(expectedState.users[1].followed).toBe(false)
    })

    it('should update the followed status of a user to "FALSE"', () => {
        const userId = 2
        const users: UserState[] = [
            {
                id: 1,
                name: "John Doe",
                status: "Active",
                followed: true,
                uniqueUrlName: "johndoe",
                photos: {
                    small: "https://example.com/user1_small.jpg",
                    large: "https://example.com/user1_large.jpg",
                },
                isLoading: false,
            },
            {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: true,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                },
                isLoading: false,
            },
        ]
        const startState: UsersState = { ...initialState, users: users }
        const action = setUnfollowUser(userId)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.users[0].followed).toBe(true)
        expect(expectedState.users[1].followed).toBe(false)
    })

    it("should correctly update the users list", () => {
        const users: UserResponse[] = [
            {
                id: 1,
                name: "John Doe",
                status: "Active",
                followed: true,
                uniqueUrlName: "johndoe",
                photos: {
                    small: "https://example.com/user1_small.jpg",
                    large: "https://example.com/user1_large.jpg",
                },
            },
            {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: false,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                },
            },
        ]
        const startState: UsersState = { ...initialState, users: [] }
        const action = setUsers(users)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.users.length).toBe(2)
        expect(expectedState.users[0].isLoading).toBe(false)
        expect(expectedState.users[1].isLoading).toBe(false)
    })

    it("should update the number of users on each page", () => {
        const usersOnPage = 20
        const startState: UsersState = { ...initialState, usersOnPage: 15 }
        const action = setUsersOnPage(usersOnPage)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.usersOnPage).toBe(usersOnPage)
    })

    it("should update the total users count", () => {
        const totalUsersCount = 120
        const startState: UsersState = { ...initialState, totalUsersCount: 0 }
        const action = setTotalUsersCount(totalUsersCount)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.totalUsersCount).toBe(totalUsersCount)
    })

    it("should change the users filter", () => {
        const usersFilter: UsersFilter = "all"
        const startState: UsersState = { ...initialState, usersFilter }
        const action = changeUsersFilter("unfollowed")
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.usersFilter).toBe("unfollowed")
    })

    it("should change the search term", () => {
        const searchTerm = v1()
        const startState: UsersState = { ...initialState, searchTerm: "" }
        const action = setUsersSearchTerm(searchTerm)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.searchTerm).toBe(searchTerm)
    })

    it("should update the loading state of a user", () => {
        const userId = 2
        const users: UserState[] = [
            {
                id: 1,
                name: "John Doe",
                status: "Active",
                followed: false,
                uniqueUrlName: "johndoe",
                photos: {
                    small: "https://example.com/user1_small.jpg",
                    large: "https://example.com/user1_large.jpg",
                },
                isLoading: false,
            },
            {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: false,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                },
                isLoading: false,
            },
        ]
        const startState: UsersState = { ...initialState, users: users }
        const action = changeUserIsLoading(userId, true)
        const expectedState: UsersState = usersReducer(startState, action)
        expect(expectedState.users[0].isLoading).toBe(false)
        expect(expectedState.users[1].isLoading).toBe(true)
    })

    it("should reset users state to the initial", () => {
        const startState: UsersState = {
            searchTerm: "John",
            currentPage: 2,
            usersOnPage: 15,
            totalUsersCount: 100,
            users: [
                {
                    id: 1,
                    name: "John Doe",
                    status: "Active",
                    followed: false,
                    uniqueUrlName: "johndoe",
                    photos: {
                        small: "https://example.com/user1_small.jpg",
                        large: "https://example.com/user1_large.jpg",
                    },
                    isLoading: false,
                },
            ],
            usersFilter: "all",
        }

        const action = cleanReducer()
        const expectedState = usersReducer(startState, action)
        expect(expectedState).toEqual(initialState)
    })
})
