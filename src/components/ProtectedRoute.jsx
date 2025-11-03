import { useMyContext } from "../store/ContextApi.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminPage }) => {
    // TODO: Access token and isAdmin state by using useMyContext hook from the ContextApi
    const { token, isAdmin } = useMyContext()

    // TODO: Navigate to login page to an unauthenticated
    if (!token) {
        return <Navigate to="/login" />
    }

    // TODO: Navigate to access-denied page if a user try to access the admin page
    if (token && adminPage && !isAdmin) {
        return <Navigate to="/access-denied" />
    }

    return children
}

export default ProtectedRoute