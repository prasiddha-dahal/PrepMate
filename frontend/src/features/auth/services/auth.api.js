import axios from "axios"

export const register = async ({ username, email, password }) => {

    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", {
            username,
            email,
            password
        });

        return res.data;

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const login = async ({ identifier, password }) => {

    try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
            identifier,
            password
        },
            { withCredentials: true }
        );

        return res.data;


    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const logout = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/auth/logout",
            { withCredentials: true }
        );

        return res.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getMe = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/auth/get-me",
            { withCredentials: true }
        );

        return res.data;

    } catch (error) {
        console.log(error)
        throw error;
    }
}




