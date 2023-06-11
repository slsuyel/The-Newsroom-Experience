

import { NavLink, Outlet } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { FaBookOpen, FaHome, FaBook, FaMoneyCheck, FaUser, FaChalkboardTeacher, FaSchool, FaShoppingCart } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";
import UseUserRole from "../pages/hooks/UseUserRole/UseUserRole";
import { Button, Spinner } from "react-bootstrap";

const Dashboard = () => {
    const user = useContext(AuthContext)

    const [userRole, isUserRoleLoading] = UseUserRole()
    // console.log(userRole);
    if (isUserRoleLoading) {
        return <div className="text-center mt-5"><Button variant="primary" disabled >
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button></div>
    }
    return (
        <div className='row w-100 mx-auto mt-4' >
            <div className="col-md-3">
                <ul className="list-unstyled">
                    <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/home">
                        <FaHome />  Dashboard
                    </NavLink></li>
                    {
                        user && userRole === "instructor" ? <>
                            <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/addclasses">
                                <FaBookOpen />  Add a Class
                            </NavLink></li>
                            <li>  <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/myclasses">
                                <FaBook />   My Classes:
                            </NavLink></li>

                        </>
                            : user && userRole === "admin" ? <>
                                <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/manageclasses">
                                    <FaBookOpen />  Manage Classes:
                                </NavLink></li>

                                <li>
                                    <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/users">
                                        <FaUser />  Manage Users:
                                    </NavLink>
                                </li>

                            </> :
                                <>
                                    <li><NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/selectedclasses">
                                        <FaBookOpen />  Selected Classes
                                    </NavLink></li>
                                    <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/enrolledclasses">
                                        <FaBook /> Enrolled Classes
                                    </NavLink></li>
                                    <li>  <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/payment">
                                        <FaMoneyCheck />   Payment
                                    </NavLink></li>

                                </>
                    }
                    <hr />



                    <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                        <FaHome /> Home
                    </NavLink></li>
                    <li><NavLink className="fs-5 mx-2 text-decoration-none" to="/instructors">
                        <FaChalkboardTeacher />  Instructors
                    </NavLink></li>
                    <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/class">
                        <FaSchool /> Class
                    </NavLink></li>
                </ul>
            </div>
            <div className="col-md-9 ">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;