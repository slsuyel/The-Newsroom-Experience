/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import UseUserRole from "../pages/hooks/UseUserRole/UseUserRole";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [userRole, ] = UseUserRole()
    const location = useLocation();
    console.log(user, userRole);

    // if (!user && isUserRoleLoading) {
    //     return <div>Loading...</div>
    // }

    if ( userRole === 'admin') {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;