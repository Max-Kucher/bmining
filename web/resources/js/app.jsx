import './bootstrap';
import * as React from 'react';

import {Provider as ReduxProvider} from "react-redux";
import {store} from "@/store/root-reducer";


import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// import Main from "@/Pages/Main";
const Main = React.lazy(() => import("./Pages/Main"));
import {HelmetProvider} from "react-helmet-async";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import About from "@/Pages/About";
import Faq from "@/Pages/Faq";
import HowItWorks from "@/Pages/HowItWorks";
import ForgotPassword from "@/Pages/Auth/ForgotPassword";


import LightWrapper from "@/Components/Wrappers/LIghtWrapper";

import PageWrapper from "@/Components/Wrappers/PageWrapper";
// const PageWrapper = React.lazy(() => import("./Components/Wrappers/PageWrapper"));

import AdminDashboard from "@/Pages/AdminDashboard";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// import ManagerDashboard from "@/Pages/ManagerDashboard";
const ManagerDashboard = React.lazy(() => import("./Pages/ManagerDashboard"));
import List from "@/Pages/Manage/ManagedUsers/List";
import {Suspense} from "react";
import {DashboardWrapper} from "@/Components/Wrappers/DashboardWrapper";
import ManagerTasks from "@/Pages/Manage/Tasks/ManagerTasks";
import Show from "@/Pages/Manage/Users/Show";
import Edit from "@/Pages/Manage/Users/Edit";
import EditTariff from "@/Pages/Tariffs/Edit";
import UsersList from '@/Pages/Manage/Users/List';
import Settings from "@/Pages/AdminPanel/Settings";
import UserSettings from "@/Pages/Settings/Settings";
import VerifyEmail from "@/Pages/Auth/VerifyEmail";
// import Tfa from "@/Pages/Settings/Tfa";
const Tfa = React.lazy(() => import("./Pages/Settings/Tfa"));
import TfaPass from "@/Pages/Auth/TfaPass";
import Users from "@/Pages/AdminPanel/Users";
import Add from "@/Pages/AdminPanel/Users/Add";
import Tariffs from "@/Pages/Tariffs/Tariffs";
import AddTariff from "@/Pages/Tariffs/Add";
import EditUserPage from "@/Pages/AdminPanel/Users/Edit";
import ManageShowOrder from "@/Pages/Manage/Orders/ShowOrder";
import OrderProcessing from "@/Pages/OrderProcessing/OrderProcessing";
import * as style from '@/../scss/main.scss';
import ShowOrder from "@/Pages/Orders/ShowOrder";
import AddMiner from "@/Pages/Manage/Users/AddMiner";
import MinerEdit from '@/Pages/Manage/Miners/Edit';
import ResetPassword from "@/Pages/Auth/ResetPassword";
import ManagersPage from "@/Pages/AdminPanel/Managers/List";
import ManagersAdd from "@/Pages/AdminPanel/Managers/Add";
import NotFoundPage from "@/Pages/404";
import {UserEdit} from "@untitled-ui/icons-react";
import {ShowManager} from "@/Pages/AdminPanel/Managers/ShowManager";
import {Terms} from "@/Pages/Terms";
import {Privacy} from "@/Pages/Privacy";
import {Withdrawal} from "@/Pages/Withdrawal";
import {Stack} from "@mui/material";

const route = (routeName, additionalData = null) => {
    if (routes.routes[routeName] ?? false) {
        if (additionalData != null) {
            let uri = "/" + routes.routes[routeName].uri;
            uri = uri.replace('{id}', additionalData.id);
            return uri;
        } else {
            return "/" + routes.routes[routeName].uri;
        }
    } else {
        return '/';
    }
};
window.route = route;
window.routeCurrent = route;
const Dashboard = React.lazy(() => import('./Pages/Dashboard'));

const router = createBrowserRouter([
    {
        element: <LightWrapper/>,
        // path: '/',
        children: [
            {
                path: '/',
                element: (
                    <Main/>
                ),
            },
            {
                path: 'login',
                element: (
                    <Login/>
                ),
            },
            {
                path: 'forgot-password',
                element: (
                    <ForgotPassword/>
                ),
            },
            {
                path: 'reset-password/:hash/:email',
                element: (
                    <ResetPassword/>
                ),
            },
            {
                path: "register",
                element: (
                    <Register/>
                ),
            },
            {
                path: "tfa-pass",
                element: (
                    <TfaPass/>
                ),
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: 'faq',
                element: <Faq/>,
            },
            {
                path: "how-it-works",
                element: <HowItWorks/>,
            },
            {
                path: "terms",
                element: <Terms/>,
            },
            {
                path: "privacy",
                element: <Privacy/>,
            },
            {
                path: '*',
                element: <NotFoundPage/>,
            }
        ],
    },
    {
        element: <PageWrapper/>,
        children: [
            {
                path: 'manage',
                children: [
                    {
                        path: 'users',
                        element: <UsersList/>
                    },
                    {
                        path: 'users/:userId/miners/add',
                        element: <AddMiner/>
                    },
                    {
                        path: 'miners/:minerId/edit',
                        element: <MinerEdit/>
                    },
                    {
                        path: 'my-users',
                        element: <List/>
                    },
                    {
                        path: 'orders/:orderId',
                        element: <ManageShowOrder/>
                    },
                    {
                        path: 'miners/:minerId/edit',
                        element: <ManageShowOrder/>
                    },
                    {
                        path: 'my-tasks',
                        element: <ManagerTasks/>
                    },
                    {
                        path: 'users/:id',
                        element: <>
                            <Show/></>
                    },
                    {
                        path: 'users/:id/edit',
                        element: <Edit/>
                    },
                ],
            },

            {
                path: 'admin',
                children: [
                    {
                        path: "settings",
                        element: <Settings/>,
                    },
                    {
                        path: "users",
                        element: <Users/>,
                    },
                    {
                        path: "users/:userId",
                        element: <EditUserPage/>,
                    },
                    {
                        path: "users/add",
                        element: <Add/>,
                    },
                    {
                        path: "tariffs",
                        element: <Tariffs/>,
                    },
                    {
                        path: "tariffs/add",
                        element: <AddTariff/>,
                    },
                    {
                        path: "tariffs/:tariffId",
                        element: <EditTariff/>,
                    },
                    {
                        path: "managers",
                        element: <ManagersPage/>,
                    },
                    {
                        path: "managers/add",
                        element: <ManagersAdd/>,
                    },
                    {
                        path: "managers/:userId/edit",
                        element: <EditUserPage/>,
                    },
                    {
                        path: "managers/:id",
                        element: <ShowManager/>,
                    },
                ],
            },

            {
                path: "orders/:orderId",
                element: <ShowOrder/>,
            },
            {
                path: "orders/:orderId/processing",
                element: <OrderProcessing/>,
            },

            {
                path: "dashboard",
                element: <DashboardWrapper/>,
            },

            {
                path: "withdrawal",
                element: <Withdrawal/>,
            },

            {
                path: "email-verify",
                element: <VerifyEmail/>,
            },
            {
                path: "settings/tfa",
                element: <Tfa/>,
            },
            {
                path: "settings",
                element: <UserSettings/>,
            },
            {
                path: "admin-dashboard",
                element: <AdminDashboard/>,
            },
            {
                path: "manager-dashboard",
                element: <ManagerDashboard/>,
            },
        ],
    },

]);
createRoot(document.getElementById("root")).render(
    <>
        <ReduxProvider store={store}>
            <HelmetProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <RouterProvider router={router}/>
                </LocalizationProvider>
            </HelmetProvider>
        </ReduxProvider>
    </>
);
