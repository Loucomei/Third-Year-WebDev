import { createBrowserRouter } from "react-router-dom";
import {
    LandingPage,
    BooksPage,
    NewsLetterPage,
    HomeLayoutPage,
    ErrorPage
} from "./pages/index"

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
        ],
    },
])