import { instance, ResponseType } from 'api/socialNetworkInstance'

export const authAPI = {
    getMe() {
        return instance.get<ResponseType<GetMeDataType>>('/auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', loginData)
    }
}

export type GetMeDataType = {
    id: number
    email: string
    login: string
}
export type LoginDataType = {
    email: string
    password: string
    remember: boolean
}