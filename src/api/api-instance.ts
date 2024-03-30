import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "5bb84785-0aba-4f56-a56a-3dbda6de189f",
  },
})

//ENUM
export const ResultCode = {
  error: 1,
  success: 0,
  captcha: 10,
} as const

//TYPES
export type Response<D = {}> = {
  data: D
  resultCode: number
  fieldsErrors: string[]
  messages: string[]
}
export type PhotosResponse = {
  small: string
  large: string
}
export type ItemsResponse<D = []> = {
  error: string | null
  items: D
  totalCount: number
}
