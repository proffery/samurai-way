import { GetMeData } from "api/authAPI"
import {
  AuthReducerActions,
  AuthState,
  authReducer,
  cleanReducer,
  initialState,
  setAuthUserData,
  setIsLoggedIn,
  setAuthUserPhoto,
  setCaptchaUrl,
} from "./authReducer"
import { v1 } from "uuid"

describe("Auth reducer", () => {
  it("auth reducer should return the initial state", () => {
    expect(authReducer(undefined, {} as AuthReducerActions)).toEqual(initialState)
  })
  it("correct data should be in state", () => {
    const startState: AuthState = { ...initialState, id: 9999, email: v1(), login: v1() }
    const userData: GetMeData = {
      id: 1,
      email: "test@example.com",
      login: "testuser",
    }
    const action = setAuthUserData(userData)
    const expectedState: AuthState = { ...initialState, ...userData }
    expect(authReducer(startState, action)).toEqual(expectedState)
    expect(authReducer(startState, action).id).toBe(1)
    expect(authReducer(startState, action).email).toBe("test@example.com")
    expect(authReducer(startState, action).login).toBe("testuser")
  })
  it('property "isLoggedIn" should change to true', () => {
    const startState: AuthState = { ...initialState, isLoggedIn: false }
    const expectedState: AuthState = { ...initialState, isLoggedIn: true }
    const action = setIsLoggedIn(true)
    expect(authReducer(startState, action)).toEqual(expectedState)
    expect(authReducer(startState, action).isLoggedIn).toBe(expectedState.isLoggedIn)
  })
  it("correct photo URL should added", () => {
    const startState: AuthState = { ...initialState, photoUrl: "" }
    const photoUrl = "https://example.com/photo.jpg"
    const expectedState: AuthState = { ...initialState, photoUrl }
    const action = setAuthUserPhoto(photoUrl)
    expect(authReducer(startState, action)).toEqual(expectedState)
    expect(authReducer(startState, action).photoUrl).toBe(expectedState.photoUrl)
  })
  it("correct captcha URL should added", () => {
    const startState: AuthState = { ...initialState, captchaUrl: "" }
    const captchaUrl = "https://example.com/captcha.jpg"
    const expectedState: AuthState = { ...initialState, captchaUrl }
    const action = setCaptchaUrl(captchaUrl)
    expect(authReducer(startState, action)).toEqual(expectedState)
    expect(authReducer(startState, action).captchaUrl).toBe(expectedState.captchaUrl)
  })
  it("auth reducer state should be restored to initial state", () => {
    const startState: AuthState = {
      id: 9999,
      email: v1(),
      login: v1(),
      photoUrl: v1(),
      isLoggedIn: true,
      captchaUrl: v1(),
    }
    const expectedState: AuthState = { ...initialState }
    const action = cleanReducer()
    expect(authReducer(startState, action)).toEqual(expectedState)
  })
})
