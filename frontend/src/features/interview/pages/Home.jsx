import { useState } from "react"

const Home = () => {

    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-[#1B1D1D] text-white font-bold">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
                <h1 className="text-center text-3xl mb-4">Upload Required Data </h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea
                        type="text"
                        name="selfDescription"
                        id="selfDescription"
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        className="w-full border p-2 rounded h-32 focus:outline-none"
                        placeholder="Enter the Self Description here..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        type="text"
                        name="jobDescription"
                        id="jobDescription"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full border p-2 rounded h-32 focus:outline-none"
                        placeholder="Enter the Job Description here..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="resume" className=" text-center bg-slate-500 hover:bg-slate-700 p-2 rounded-lg cursor-pointer ">{resume ? "Change Resume" : "Upload your resume"}</label>
                    <input
                        type="file"
                        name="resume"
                        id="resume"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                </div>

                <button className="w-full bg-red-600 text-white p-2 rounded cursor-pointer transition transform hover:bg-red-800 active:scale-95 active:shadow-inner">
                    Generate Interview Report
                </button>

                {resume && (
                        <p className="text-sm text-green-400 mt-1">
                            Selected: {resume.name}
                        </p>
                )}

            </form>
        </main>
    )
}

export default Home
