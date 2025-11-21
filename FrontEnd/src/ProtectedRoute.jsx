import { Navigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to={"/"} />
    }

    try {
        const decoded = jwtDecode(token)
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            return <Navigate to="/" />;
        }
    } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute