

import { NavLink, Outlet } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { FaBookOpen, FaHome, FaBook, FaMoneyCheck, FaUser, FaChalkboardTeacher, FaSchool, FaShoppingCart } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";

const Dashboard = () => {
    const user = useContext(AuthContext)
    return (
        <div className='row w-100 mx-auto' >
            <h2 className="text-center">Dashboard</h2>

            <div className="col-md-3">
                <ul className="list-unstyled">
                    <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/dashboard/home">
                        <FaHome />  Dashboard
                    </NavLink></li>
                    {
                        user && user.role === "instructor" ? <>
                            <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                                <FaBookOpen />  Add a Class
                            </NavLink></li>
                            <li>  <NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                                <FaBook />   My Classes:
                            </NavLink></li>

                        </>
                            : user && user.role === "admin" ? <>
                                <li> <NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                                    <FaBookOpen />  Manage Classes:
                                </NavLink></li>
                                <li><NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                                    <FaUser />  Manage Users:
                                </NavLink></li>

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

                    {/*  */}


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
            <div className="col-md-9 bg-secondary">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;