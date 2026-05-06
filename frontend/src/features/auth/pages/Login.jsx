import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react";

const Login = () => {

    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ identifier, password });
        if (success) {
            navigate('/');
        } else {
            alert("Invalid credentials")
        }

    }

    if (loading) {
        return (
            <main className="min-h-screen w-full bg-[#151515]">
                <p className="text-white">Loading...</p>
            </main>
        )
    }

    return (
        <>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-[#1B1D1D] text-white font-bold ">
                    <div className="w-full max-w-sm  p-6 rounded shadow bg-[#1B1D1D]">

                        <h1 className="text-3xl font-extrabold text-center mb-4 text-red-500">Login</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label className="block text-sm my-2">Username or Email</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter username or email"
                                    name="identifier"
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    value={identifier}
                                />
                            </div>

                            <div>
                                <label className="block text-sm my-2">Password</label>
                                <input
                                    type="password"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <button className="w-full bg-red-600 text-white p-2 rounded cursor-pointer transition transform hover:bg-red-800 active:scale-95 active:shadow-inner">
                                Login
                            </button>
                            <p>Don't have an account? <Link to={'/register'} className="font-normal underline text-blue-600 my-4">Go to Register</Link> </p>

                        </form>
                    </div>
                </div>

            </main>
        </>
    )
}

export default Login
