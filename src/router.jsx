import { createBrowserRouter } from "react-router-dom";
import {
    LandingPage,
    HomeLayoutPage,
    ErrorPage,
    LoginPage,
    RegisterPage,
    ItemDetailPage
} from "./pages/index"

import { action as registerAction } from "./pages/RegisterPage";
import { action as loginAction } from "./pages/LoginPage";

import { store } from "./store";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <HomeLayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
                action: loginAction(store)
            },
            {
                path: "/register",
                element: <RegisterPage />,
                action: registerAction
            },
            {
                path: "/item",
                element: <ItemDetailPage />,
            },
        ],
    },
])