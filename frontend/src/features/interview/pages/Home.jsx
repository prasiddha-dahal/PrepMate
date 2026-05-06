import { useRef, useState } from "react"
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {

    const navigate = useNavigate()
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const resumeInputRef = useRef();

    const { loading, generateReport } = useInterview()

    const handleGenerateReport = async () => {
        const resume = resumeInputRef.current.files[0];
        const data = await generateReport({ jobDescription, selfDescription, resume })
        navigate(`/interview/${data._id}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <main className="flex justify-center items-center min-h-screen bg-[#1B1D1D] text-white font-bold">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
                <h1 className="text-center text-3xl mb-4 text-red-500">Upload Required Data </h1>
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
                    <label htmlFor="resume" className=" text-center bg-slate-500 hover:bg-slate-700 p-2 rounded-lg cursor-pointer ">Upload your resume</label>
                    <input
                        type="file"
                        name="resume"
                        id="resume"
                        className="hidden"
                        accept=".pdf"
                        ref={resumeInputRef}
                    />
                </div>

                <button className="w-full bg-red-600 text-white p-2 rounded cursor-pointer transition transform hover:bg-red-800 active:scale-95 active:shadow-inner"
                    onClick={handleGenerateReport}
                >
                    Generate Interview Report
                </button>

            </form>

            {loading &&
                <div>
                    <p>loading...</p>
                </div>
            }
        </main>

    )
}

export default Home
