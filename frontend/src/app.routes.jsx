import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { Protected } from "./features/auth/components/Protected";
import Dashboard from "./features/interview/pages/Dashboard";
import InterviewReport from "./features/interview/pages/InterviewReport";
import GenerateReport from "./features/interview/pages/GenerateReport";
import AppLayout from './features/interview/components/AppLayout'

const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        element: (
            <Protected>
                <AppLayout />
            </Protected>
        ),
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/interview/:id', element: <InterviewReport /> },
            { path: '/generate-report', element: <GenerateReport /> },
        ]
    }
]);

export default router;
