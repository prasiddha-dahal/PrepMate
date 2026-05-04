import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const Protected = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <p>Loading ...</p>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}
