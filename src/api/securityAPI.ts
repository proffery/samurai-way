import { instance } from "api/api-instance"

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>("/security/get-captcha-url")
    },
}
