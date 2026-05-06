import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password });
        navigate('/login');
    }

    if (loading) {
        return (
            <main>
                <p>Loading...</p>
            </main>
        )
    }

    return (
        <>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-[#1B1D1D] text-white font-bold ">
                    <div className="w-full max-w-sm  p-6 rounded shadow bg-[#1B1D1D]">

                        <h1 className="text-3xl font-extrabold text-center mb-4 text-red-500">Register</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label className="block text-sm my-2">Username</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter username"
                                    name="username"
                                    onChange={(e)=>setUsername(e.target.value)}
                                    value={username}
                                />
                            </div>

                            <div>
                                <label className="block text-sm my-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div>
                                <label className="block text-sm my-2">Password</label>
                                <input
                                    type="password"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <button className="w-full bg-red-600 text-white p-2 rounded cursor-pointer transition transform hover:bg-red-800 active:scale-95 active:shadow-inner">
                                Register
                            </button>

                            <p>Already have an account? <Link to={'/login'} className="font-normal underline text-blue-600">Go to Login</Link> </p>

                        </form>
                    </div>
                </div>

            </main>
        </>
    )

}

export default Register
