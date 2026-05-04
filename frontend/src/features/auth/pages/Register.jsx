import { useNavigate, Link } from "react-router"

const Register = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-[#151515] text-white font-bold ">
                    <div className="w-full max-w-sm  p-6 rounded shadow bg-[#151515]">

                        <h1 className="text-3xl font-extrabold text-center mb-4">Register</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label className="block text-sm my-2">Username</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter username"
                                    name="username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm my-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded focus:outline-none"
                                    placeholder="Enter email"
                                    name="email"
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
                                Register
                            </button>

                        </form>
                        <p>Already have an account? <Link to={'/login'} className="font-normal underline text-blue-600">Go to Login</Link> </p>
                    </div>
                </div>

            </main>
        </>
    )

}

export default Register
