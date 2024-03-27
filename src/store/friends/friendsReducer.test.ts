import { cleanReducer } from 'store/auth/authReducer'
import {
    FriendsActions, FriendsState, friendsReducer,
    initialState, setFriends, setFriendsOnPage, setFriendsPage,
    setPossibleFriends, setPossibleFriendsOnPage, setPossibleFriendsPage,
    setPossibleTotalFriendsCount, setTotalFriendsCount
} from './friendsReducer'
import { UserResponse } from 'api/usersAPI'

describe('Friends reducer', () => {
    it('friends reducer should return the initial state', () => {
        expect(friendsReducer(undefined, {} as FriendsActions)).toEqual(initialState)
    })

    it('users should corectly added to friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, users: []
            }
        }
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
                }
            }, {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: false,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                }
            }
        ]
        const action = setFriends(users)
        const expectedState: FriendsState = { ...initialState, friends: { ...initialState.friends, users } }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).friends.users[0].name).toBe("John Doe")
        expect(friendsReducer(startState, action).friends.users[1].photos.small).toBe("https://example.com/user2_small.jpg")
    })

    it('current page should should corectly added to friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, currentPage: 0
            }
        }
        const currentPage = 2
        const action = setFriendsPage(currentPage)
        const expectedState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, currentPage
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).friends.currentPage).toBe(currentPage)
    })

    it('correct number of users on the page page should added to friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, usersOnPage: 0
            }
        }
        const usersOnPage = 10
        const action = setFriendsOnPage(usersOnPage)
        const expectedState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, usersOnPage
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).friends.usersOnPage).toBe(usersOnPage)
        expect(friendsReducer(startState, action).friends.usersOnPage).not.toBe(0)
    })

    it('correct number of total users page should added to friends state', () => {


        const startState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, totalUsersCount: 100
            }
        }
        const totalUsersCount = 50
        const action = setTotalFriendsCount(totalUsersCount)
        const expectedState: FriendsState = {
            ...initialState,
            friends: {
                ...initialState.friends, totalUsersCount
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).friends.totalUsersCount).toBe(totalUsersCount)
        expect(friendsReducer(startState, action).friends.totalUsersCount).not.toBe(100)
    })

    it('users should corectly added possible friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, users: []
            }
        }
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
                }
            }, {
                id: 2,
                name: "Jane Smith",
                status: "Inactive",
                followed: false,
                uniqueUrlName: "janesmith",
                photos: {
                    small: "https://example.com/user2_small.jpg",
                    large: "https://example.com/user2_large.jpg",
                }
            }
        ]
        const action = setPossibleFriends(users)
        const expectedState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, users
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).possibleFriends.users[0].name).toBe("John Doe")
        expect(friendsReducer(startState, action).possibleFriends.users[1].photos.small).toBe("https://example.com/user2_small.jpg")
    })

    it('current page should should corectly added to possible friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, currentPage: 0
            }
        }
        const currentPage = 2
        const action = setPossibleFriendsPage(currentPage)
        const expectedState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, currentPage
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).possibleFriends.currentPage).toBe(currentPage)
    })

    it('correct number of users on the page page should added to possible friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, usersOnPage: 5
            }
        }
        const usersOnPage = 99
        const action = setPossibleFriendsOnPage(usersOnPage)
        const expectedState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, usersOnPage
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).possibleFriends.usersOnPage).toBe(usersOnPage)
        expect(friendsReducer(startState, action).possibleFriends.usersOnPage).not.toBe(5)
    })

    it('correct number of total users page should added to possible friends state', () => {
        const startState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, totalUsersCount: 552
            }
        }
        const totalUsersCount = 18
        const action = setPossibleTotalFriendsCount(totalUsersCount)
        const expectedState: FriendsState = {
            ...initialState,
            possibleFriends: {
                ...initialState.possibleFriends, totalUsersCount
            }
        }
        expect(friendsReducer(startState, action)).toEqual(expectedState)
        expect(friendsReducer(startState, action).possibleFriends.totalUsersCount).toBe(totalUsersCount)
        expect(friendsReducer(startState, action).possibleFriends.totalUsersCount).not.toBe(552)
    })

    it('friends reducer state should be restored to initial state', () => {
        const startState: FriendsState = {
            friends: { ...initialState.possibleFriends },
            possibleFriends: { ...initialState.friends }
        }
        const action = cleanReducer()
        expect(friendsReducer(startState, action)).toEqual(initialState)
    })
})