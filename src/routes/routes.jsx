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
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import InstructorRoute from "./InstructorRoute";
import Payment from "../pages/Dashboard/Payment/Payment";

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
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: 'home',
        element: <PrivateRoute><DashHome /></PrivateRoute>
      },
      {
        path: 'selectedclasses',
        element: <SelectedClasses />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'addclasses',
        element: <InstructorRoute><AddClass /></InstructorRoute>
      },
      {
        path: 'myclasses',
        element: <InstructorRoute><MyClassInstructure /></InstructorRoute>
      },
      {
        path: 'manageclasses',
        element: <AdminRoute><ManageClassesAdmin /></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute> <ManageUsers /></AdminRoute>
      },

    ]
  }

]);