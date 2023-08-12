import React, { useReducer } from "react";
import { CartContext, CommentContext, OrderContext, UserContext } from "./context";
import { cartReducer, commentReducer, initCart, initComment, initOrder, initUser, orderReducer, userReducer } from "./reducer";
type IProps = {
    children?: React.ReactNode
}

export const CartProvider = ({ children }: IProps) => {
    const [cart, dispatch] = useReducer(cartReducer, initCart)
    return <CartContext.Provider value={{ cart, dispatch }} >{children}</CartContext.Provider>
}

export const CommentProvider = ({ children }: IProps) => {
    const [comments, dispatch] = useReducer(commentReducer, initComment)
    return <CommentContext.Provider value={{ comments, dispatch }} >{children}</CommentContext.Provider>
}
export const OrderProvider = ({ children }: IProps) => {
    const [orders, dispatch] = useReducer(orderReducer, initOrder)
    return <OrderContext.Provider value={{ orders, dispatch }} >{children}</OrderContext.Provider>
}
export const UserProvider = ({ children }: IProps) => {
    const [user, dispatchUser] = useReducer(userReducer, initUser)
    return <UserContext.Provider value={{ user, dispatchUser }} >{children}</UserContext.Provider>
}