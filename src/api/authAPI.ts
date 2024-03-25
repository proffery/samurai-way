import { instance, Response } from 'api/socialNetworkInstance'

export const authAPI = {
    getMe() {
        return instance.get<Response<GetMeData>>('/auth/me')
    },
    logout() {
        return instance.delete<Response>('/auth/login')
    },
    login(loginData: LoginData) {
        return instance.post<Response<{ userId: number }>>('/auth/login', loginData)
    }
}

export type GetMeData = {
    id: number
    email: string
    login: string
}
export type LoginData = {
    email: string
    password: string
    remember: boolean
}