import { createBrowserRouter } from "react-router-dom";
import {
    LandingPage,
    BooksPage,
    NewsLetterPage,
    HomeLayoutPage,
    ErrorPage,
    LoginPage,
    RegisterPage
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
                path: "/books",
                element: <BooksPage />,
            },
            {
                path: "/newsletter",
                element: <NewsLetterPage />,
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
        ],
    },
])