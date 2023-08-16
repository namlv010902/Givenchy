import { instance } from "./config.service"
const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
}

export const register = (data: any) => {
    return instance.post('auth/register', data)
}
export const login = (data: any) => {
    return instance.post('auth/login', data)
}
export const updateProfile = (data: any) => {
    return instance.patch('/profile/', data, { headers })
}
export const getProfile = () => {
    return instance.get('profile/' , { headers })
}
