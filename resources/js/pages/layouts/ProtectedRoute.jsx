import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = (user) => {
    return user ? <Outlet /> : <Navigate to={'/'} />
}