import { useNavigate, useLocation } from "react-router";
import { useInterview } from "../hooks/useInterview";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useInterview();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-[#151717] border-b border-[#2a2c2c] px-6 py-3 flex justify-between items-center">
            <p
                onClick={() => navigate("/")}
                className="text-red-500 font-bold text-lg cursor-pointer"
            >
                PrepAI
            </p>
            <div className="flex items-center gap-6 cursor-pointer">
                <NavLink label="Dashboard" active={isActive("/")} onClick={() => navigate("/")} />
                <NavLink label="New Report" active={isActive("/generate-report")} onClick={() => navigate("/generate-report")} />
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

const NavLink = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`text-sm transition ${active ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
    >
        {label}
    </button>
);

export default Navbar;
