/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import UseUserRole from "../pages/hooks/UseUserRole/UseUserRole";

const InstructorRoute = ({ children }) => {

    const [userRole,] = UseUserRole()
    const location = useLocation();

    // if (!user && isUserRoleLoading) {
    //     return <div>Loading...</div>
    // }

    if (userRole === 'instructor') {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;