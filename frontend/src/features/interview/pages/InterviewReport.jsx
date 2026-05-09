import { useEffect } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";

const InterviewReport = () => {
    const { id } = useParams();
    const { report, getReportById, loading } = useInterview();

    useEffect(() => {
        getReportById(id);
    }, [id]);

    if (loading) return (
        <main className="flex justify-center items-center min-h-screen bg-[#1B1D1D] text-white">
            <p className="text-gray-400 animate-pulse">Generating your report...</p>
        </main>
    );

    if (!report) return null;

    return (
        <main className="min-h-screen bg-[#1B1D1D] text-white font-bold">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl text-red-500 mb-1">Interview Report</h1>
                <p className="text-gray-500 text-sm mb-8">AI-generated preparation guide based on your resume & job description</p>

                <div className="bg-[#232626] border border-[#3a3d3d] rounded-xl p-5 mb-6 flex items-center gap-8 flex-wrap">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Match score</p>
                        <p className="text-red-500 text-5xl font-bold">{report.matchScore}<span className="text-2xl text-gray-500">%</span></p>
                    </div>
                    <div className="flex-1 min-w-40">
                        <div className="bg-[#2a2c2c] rounded-full h-2.5">
                            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${report.matchScore}%` }} />
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                            {report.matchScore >= 75 ? "Strong match" : report.matchScore >= 50 ? "Good match — a few gaps to address" : "Needs significant preparation"}
                        </p>
                    </div>
                </div>

                <Section title="Technical Questions">
                    {report.technicalQuestions.map((q, i) => <QuestionCard key={i} q={q} />)}
                </Section>

                <Section title="Behavioural Questions">
                    {report.behaviourQuestions.map((q, i) => <QuestionCard key={i} q={q} />)}
                </Section>

                <Section title="Skill Gaps">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {report.skillGap.map((s, i) => (
                            <div key={i} className="bg-[#232626] border border-[#3a3d3d] rounded-xl px-4 py-3 flex justify-between items-center">
                                <span className="text-sm text-gray-200">{s.skill}</span>
                                <SeverityBadge severity={s.severity} />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Preparation Plan */}
                <Section title="Preparation Plan">
                    {report.preparationPlans.map((p, i) => (
                        <div key={i} className="border-l-2 border-red-600 bg-[#1a1c1c] rounded-r-xl pl-4 pr-4 py-3 mb-3">
                            <p className="text-red-500 text-xs font-semibold mb-1">Day {p.day}</p>
                            <p className="text-white text-sm font-semibold mb-2">{p.focus}</p>
                            {p.tasks.map((task, j) => (
                                <div key={j} className="flex items-start gap-2 text-gray-400 text-sm py-0.5">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                    {task}
                                </div>
                            ))}
                        </div>
                    ))}
                </Section>
            </div>
        </main>
    );
};

const Section = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
        {children}
    </div>
);

const QuestionCard = ({ q }) => (
    <div className="bg-[#1a1c1c] border border-[#3a3d3d] rounded-lg p-4 mb-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Question</p>
        <p className="text-sm text-gray-200 leading-relaxed">{q.question}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3 mb-1">Interviewer's intent</p>
        <p className="text-sm text-gray-500 leading-relaxed">{q.intention}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3 mb-1">How to answer</p>
        <p className="text-sm text-gray-500 leading-relaxed">{q.answer}</p>
    </div>
);

const SeverityBadge = ({ severity }) => {
    const styles = {
        high: "text-red-600 bg-white",
        medium: "text-yellow-600 bg-white",
        low: "text-green-600 bg-white",
    };
    return <span className={`text-xs px-3 py-1 rounded-full font-semibold ${styles[severity]}`}>{severity}</span>;
};

export default InterviewReport;
