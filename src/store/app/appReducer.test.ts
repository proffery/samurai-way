import {
    AlertObjectType,
    AppActionsType, AppReducerStateType, appReducer,
    initialState, removeAppAlert, setAppAlert,
    setAppIsInitialized, setAppIsLoading, setAppNavbarCollapsed,
    setCurrentPath
} from './appReducer'

describe('App reducer', () => {
    it('appReducer should return the initial state', () => {
        expect(appReducer(initialState, {} as AppActionsType)).toEqual(initialState)
    })

    it('property "isLoading" should change to true', () => {
        const startState: AppReducerStateType = { ...initialState, isLoading: false }
        const action = setAppIsLoading(true)
        const expectedState: AppReducerStateType = { ...initialState, isLoading: true }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).isLoading).toBe(expectedState.isLoading)
    })

    it('new Alert should added to state', () => {
        const startState: AppReducerStateType = { ...initialState, alerts: [] }
        const newAlert: AlertObjectType = {
            id: '123',
            type: 'succeeded',
            message: 'This is a new alert',
        }
        const action = setAppAlert(newAlert)
        const expectedState: AppReducerStateType = { ...initialState, alerts: [newAlert] }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).alerts).toHaveLength(1)
    })

    it('correct alert should removed from state', () => {
        const removedAlert: AlertObjectType = {
            id: '123',
            type: 'succeeded',
            message: 'This is a correct alert',
        }
        const notRemovedAlert: AlertObjectType = {
            id: '124',
            type: 'succeeded',
            message: 'This is a some alert',
        }
        const startState: AppReducerStateType = { ...initialState, alerts: [removedAlert, notRemovedAlert] }
        const expectedState: AppReducerStateType = { ...startState, alerts: [notRemovedAlert] }
        const idToRemove = '123'
        const action = removeAppAlert(idToRemove)
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(startState.alerts[1].id).toBe(expectedState.alerts[0].id)
    })

    it('property "navbarCollapsed" should change to false', () => {
        const startState: AppReducerStateType = { ...initialState, navbarCollapsed: true }
        const expectedState: AppReducerStateType = { ...initialState, navbarCollapsed: false }
        const action = setAppNavbarCollapsed(false)
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).navbarCollapsed).toBe(expectedState.navbarCollapsed)
    })

    it('property "isInitialized" should change to false', () => {
        const startState: AppReducerStateType = { ...initialState, isInitialized: true }
        const expectedState: AppReducerStateType = { ...initialState, isInitialized: false }
        const action = setAppIsInitialized(false)
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).isInitialized).toBe(expectedState.isInitialized)
    })

    it('property "currentPath" should change to "newPath"', () => {
        const startState: AppReducerStateType = { ...initialState, currentPath: '/somePath' }
        const newPath = '/dashboard'
        const action = setCurrentPath(newPath)
        const expectedState: AppReducerStateType = { ...initialState, currentPath: newPath }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).currentPath).toBe(expectedState.currentPath)
    })
})