import { instance } from "./config"

export const register=(data:any)=>{
    return instance.post('auth/register',data)
}
export const login=(data:any)=>{
    return instance.post('auth/login',data)
}
export const updateProfile=(data:any)=>{
    return instance.patch('auth/profile',data)
}
export const getUser=(id:string)=>{
    return instance.get('auth/user/'+id)
}
