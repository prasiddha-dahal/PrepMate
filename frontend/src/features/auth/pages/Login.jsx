import { Link } from "react-router"

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-[#151515] text-white font-bold ">
                    <div className="w-full max-w-sm  p-6 rounded shadow bg-[#151515]">

                        <h1 className="text-3xl font-extrabold text-center mb-4">Login</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label className="block text-sm my-2">Username or Email</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter username or email"
                                    name="identifier"
                                />
                            </div>

                            <div>
                                <label className="block text-sm my-2">Password</label>
                                <input
                                    type="password"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter password"
                                    name="password"
                                />
                            </div>

                            <button className="w-full bg-red-600 text-white p-2 rounded cursor-pointer transition transform hover:bg-red-800 active:scale-95 active:shadow-inner">
                                Login
                            </button>

                        </form>
                        <p>Don't have an account? <Link to={'/register'} className="font-normal underline text-blue-600">Go to Register</Link> </p>
                    </div>
                </div>

            </main>
        </>
    )
}

export default Login
