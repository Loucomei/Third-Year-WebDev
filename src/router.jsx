import { createBrowserRouter } from "react-router-dom";
import Items from "./items/Items";
import {
  LandingPage,
  BooksPage,
  NewsLetterPage,
  HomeLayoutPage,
  ErrorPage,
  ItemPage,
} from "./pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "/items",
        element: <Items />,
      },
      {
        path: "/items/:itemId",
        element: <ItemPage />,
      },
    ],
  },
]);
