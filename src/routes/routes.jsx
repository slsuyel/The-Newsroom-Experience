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
import PaymentList from "../pages/Dashboard/PaymentList/PaymentList";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import UpdateClass from "../pages/Dashboard/UpdateClass/UpdateClass";
const baseUrl = 'https://ass-12-server-eight.vercel.app';
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
        element: <Instructors baseUrl={baseUrl} />,
      },
      {
        path: "/class",
        element: <Classes baseUrl={baseUrl} />,
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
        element: <PrivateRoute> <SelectedClasses /></PrivateRoute>
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: 'paymenthistory',
        element: <PrivateRoute><PaymentList /></PrivateRoute>
      },
      {
        path: 'enrolledclasses',
        element: <EnrolledClasses />
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
        path: 'classupdate/:id',
        element: <InstructorRoute><UpdateClass /></InstructorRoute>
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