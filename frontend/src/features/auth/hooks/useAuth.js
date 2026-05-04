import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ identifier, password }) => {
        setLoading(true);
        try {
            const data = await login({ identifier, password });
            setUser(data.user);
            console.log(data.user)
            return true;
        } catch (error) {
            console.log(error.response?.data?.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return true;
        } catch (error) {
            console.log(error.response?.data?.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
            return true;
        } catch (error) {
            console.log(error.response?.data?.message);
            return false;
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}



