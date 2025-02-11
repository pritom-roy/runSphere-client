import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Marathons from "../pages/Marathons";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddMarathon from "../pages/AddMarathon";
import MyMarathons from "../pages/MyMarathons";
import MyApplyList from "../pages/MyApplyList";
import MarathonDetails from "../pages/MarathonDetails";
import MarathonRegistration from "../pages/MarathonRegistration";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/Faq";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "faq",
                element: <FAQ />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path: "marathons",
                element: <PrivateRoute><Marathons /></PrivateRoute>
            },
            {
                path: "details/:id",
                element: <PrivateRoute><MarathonDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://run-sphere-server.vercel.app/marathons/${params.id}`)
            },
            {
                path: "registration/:id",
                element: <PrivateRoute><MarathonRegistration /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://run-sphere-server.vercel.app/marathons/${params.id}`)
            },
            {
                path: "dashboard",
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="addmarathon" replace />
                    },
                    {
                        path: "addmarathon",
                        element: <AddMarathon />
                    },
                    {
                        path: "mymarathon",
                        element: <MyMarathons />
                    },
                    {
                        path: "myapply",
                        element: <MyApplyList />
                    }
                ]
            },
        ]
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default router;