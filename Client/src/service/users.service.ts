
import { instance } from "./config.service"
const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}

export const sendMailer = (email: string) => {
    return instance.post('email', { email: email })
}
export const verifyTokenMailer = (token: string) => {
    return instance.post('verifyEmailToken', { token: token })
}
const tokenEmail = JSON.parse(localStorage.getItem('emailToken')!)
export const forgotPassword = (data: { newPassword: string, confirmPassword: string }) => {
    return instance.patch('forgotPassword', data, {
        headers: { 'Authorization': 'Bearer ' + tokenEmail }
    })
}