import { createContext } from "react";
type Props = {
    children?: React.ReactNode
}
const provider =createContext([]) 

export const cartProvider=({children}:Props)=>{
    return<>
    <provider.Provider value={}></provider.Provider>
    </>
}