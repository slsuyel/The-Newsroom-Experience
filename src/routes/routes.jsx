import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../LayOut/Main";
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/Shared/Login/Login";
import Register from "../pages/Shared/Register/Register";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../LayOut/Dashboard";
import DashHome from "../pages/Dashboard/DashHome/DashHome";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClassInstructure from "../pages/Dashboard/MyClassInstructure/MyClassInstructure";
import ManageClassesAdmin from "../pages/Dashboard/ManageClassesAdmin/ManageClassesAdmin";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/class",
        element: <Classes />,
      },

    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'home',
        element: <DashHome />
      },
      {
        path: 'selectedclasses',
        element: <SelectedClasses />
      },
      {
        path: 'addclasses',
        element: <AddClass />
      },
      {
        path: 'myclasses',
        element: <MyClassInstructure />
      },
      {
        path: 'manageclasses',
        element: <ManageClassesAdmin />
      },
      {
        path: 'users',
        element: <ManageUsers />
      },

    ]
  }

]);