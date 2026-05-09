import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { Protected } from "./features/auth/components/Protected";
import Dashboard from "./features/interview/pages/Dashboard";
import InterviewReport from "./features/interview/pages/InterviewReport";
import GenerateReport from "./features/interview/pages/GenerateReport";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Protected>
            <Dashboard />
        </Protected>
    },
    {
        path: '/interview/:id',
        element: <Protected>
            <InterviewReport />
        </Protected>
    },
    {
        path: '/generate-report',
        element: <Protected><GenerateReport /></Protected>
    }

])

export default router
