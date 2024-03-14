import { GetMeDataType } from 'api/social-network-api'
import {
    AuthReducerActionsType, AuthStateType, authReducer,
    cleanReducer, initialState, setAuthUserData,
    setIsLoggedIn, setPhotoUrl
} from './authReducer'
import { v1 } from 'uuid'

describe('Auth reducer', () => {
    it('auth reducer should return the initial state', () => {
        expect(authReducer(undefined, {} as AuthReducerActionsType)).toEqual(initialState)
    })

    it('correct data should be in state', () => {
        const startState: AuthStateType = { ...initialState, id: 9999, email: v1(), login: v1() }
        const userData: GetMeDataType = {
            id: 1,
            email: 'test@example.com',
            login: 'testuser',
        }
        const action = setAuthUserData(userData)
        const expectedState: AuthStateType = { ...initialState, ...userData }
        expect(authReducer(startState, action)).toEqual(expectedState)
        expect(authReducer(startState, action).id).toBe(1)
        expect(authReducer(startState, action).email).toBe('test@example.com')
        expect(authReducer(startState, action).login).toBe('testuser')
    })

    it('property "isLoggedIn" should change to true', () => {
        const startState: AuthStateType = { ...initialState, isLoggedIn: false }
        const expectedState: AuthStateType = { ...initialState, isLoggedIn: true }
        const action = setIsLoggedIn(true)
        expect(authReducer(startState, action)).toEqual(expectedState)
        expect(authReducer(startState, action).isLoggedIn).toBe(expectedState.isLoggedIn)
    })

    it('correct URL should added', () => {
        const startState: AuthStateType = { ...initialState, photoUrl: '' }
        const photoUrl = 'https://example.com/photo.jpg'
        const expectedState: AuthStateType = { ...initialState, photoUrl }
        const action = setPhotoUrl(photoUrl)
        expect(authReducer(startState, action)).toEqual(expectedState)
        expect(authReducer(startState, action).photoUrl).toBe(expectedState.photoUrl)
    })

    it('auth reduced state should be restored to initial state', () => {
        const startState: AuthStateType = {
            id: 9999,
            email: v1(),
            login: v1(),
            photoUrl: v1(),
            isLoggedIn: true
        }
        const expectedState: AuthStateType = { ...initialState }
        const action = cleanReducer()
        expect(authReducer(startState, action)).toEqual(expectedState)
    })
})