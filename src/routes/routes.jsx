import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home/Home";
import Main from "../LayOut/Main";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
    //   errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);