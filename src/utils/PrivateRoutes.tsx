import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

type Props = {
    children : React.ReactNode
}
function PrivateRoutes({children}:Props) {
    const {isAuth} = useAppSelector(store => store.auth)
    return isAuth ? children :  <Navigate to="/register" />
}

export default PrivateRoutes
