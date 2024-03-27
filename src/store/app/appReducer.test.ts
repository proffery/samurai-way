import {
    AlertObject,
    AppActions, AppState, appReducer,
    initialState, removeAppAlert, setAppAlert,
    setAppIsInitialized, setAppIsLoading, setCurrentPath
} from './appReducer'

describe('App reducer', () => {
    it('app reducer should return the initial state', () => {
        expect(appReducer(undefined, {} as AppActions)).toEqual(initialState)
    })

    it('property "isLoading" should change to true', () => {
        const startState: AppState = { ...initialState, isLoading: false }
        const action = setAppIsLoading(true)
        const expectedState: AppState = { ...initialState, isLoading: true }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).isLoading).toBe(expectedState.isLoading)
    })

    it('new alert should added to state', () => {
        const startState: AppState = { ...initialState, alerts: [] }
        const newAlert: AlertObject = {
            id: '123',
            type: 'succeeded',
            message: 'This is a new alert',
        }
        const action = setAppAlert(newAlert)
        const expectedState: AppState = { ...initialState, alerts: [newAlert] }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).alerts).toHaveLength(1)
    })

    it('correct alert should removed from state', () => {
        const removedAlert: AlertObject = {
            id: '123',
            type: 'succeeded',
            message: 'This is a correct alert',
        }
        const notRemovedAlert: AlertObject = {
            id: '124',
            type: 'succeeded',
            message: 'This is a some alert',
        }
        const startState: AppState = { ...initialState, alerts: [removedAlert, notRemovedAlert] }
        const expectedState: AppState = { ...startState, alerts: [notRemovedAlert] }
        const idToRemove = '123'
        const action = removeAppAlert(idToRemove)
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(startState.alerts[1].id).toBe(expectedState.alerts[0].id)
    })

    it('property "isInitialized" should change to false', () => {
        const startState: AppState = { ...initialState, isInitialized: true }
        const expectedState: AppState = { ...initialState, isInitialized: false }
        const action = setAppIsInitialized(false)
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).isInitialized).toBe(expectedState.isInitialized)
    })

    it('property "currentPath" should change to "newPath"', () => {
        const startState: AppState = { ...initialState, currentPath: '/somePath' }
        const newPath = '/dashboard'
        const action = setCurrentPath(newPath)
        const expectedState: AppState = { ...initialState, currentPath: newPath }
        expect(appReducer(startState, action)).toEqual(expectedState)
        expect(appReducer(startState, action).currentPath).toBe(expectedState.currentPath)
    })
})