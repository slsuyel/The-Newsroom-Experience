import { FaHome, FaBookOpen, FaBook, FaUser, FaMoneyCheck, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
import logo from '../assets/dash-logo.png';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProviders';
import UseUserRole from '../pages/hooks/UseUserRole/UseUserRole';
import { Button, Spinner } from 'react-bootstrap';
import '../assets/css/custom.css'
const DashboardMain = () => {

    const { user, logOut } = useContext(AuthContext)
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

    const handleLogOut = () => {
        logOut()
    }

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row  ">
                    <div style={{ backgroundColor: '#1C2434', }} className="col-md-2 d-flex sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                            <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <img src={logo} alt="" className='img-fluid' />
                            </a>
                            <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item w-100">
                                    <NavLink to="/dashboard/home" className="nav-link px-sm-0 px-2 text-white">
                                        <FaHome className="fs-5" /><span className="ms-1 d-none d-sm-inline">Home</span>
                                    </NavLink>
                                </li>

                                {user && userRole === 'instructor' ? (
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/addclasses" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaBookOpen className="fs-5" /><span className="ms-1 d-none d-sm-inline">Add a Class</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/myclasses" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaBook className="fs-5" /><span className="ms-1 d-none d-sm-inline">My Classes</span>
                                            </NavLink>
                                        </li>
                                    </>
                                ) : user && userRole === 'admin' ? (
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/manageclasses" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaBookOpen className="fs-5" /><span className="ms-1 d-none d-sm-inline">Manage Classes</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to="/dashboard/users" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaUser className="fs-5" /><span className="ms-1 d-none d-sm-inline">Manage Users:</span>
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/selectedclasses" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaBookOpen className="fs-5" /><span className="ms-1 d-none d-sm-inline">Selected Classes</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/enrolledclasses" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaBook className="fs-5" /><span className="ms-1 d-none d-sm-inline">Enrolled Classes</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/paymenthistory" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                                <FaMoneyCheck className="fs-5" /><span className="ms-1 d-none d-sm-inline">Payment History</span>
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                <div className='border-bottom border-dark-subtle w-100 pt-1'></div>


                                <li>
                                    <NavLink to="/" exact className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                        <FaHome className="fs-5" /><span className="ms-1 d-none d-sm-inline">Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/instructors" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                        <FaChalkboardTeacher className="fs-5" /><span className="ms-1 d-none d-sm-inline">Instructors</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/class" className="nav-link px-sm-0 px-2 text-white" activeClassName="active">
                                        <FaSchool className="fs-5" /><span className="ms-1 d-none d-sm-inline">Class</span>
                                    </NavLink>
                                </li>


                                <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={user?.photoURL} alt="hugenerd" width="32" height="32" className="rounded-circle" />
                                        <span className="d-none d-sm-inline mx-1">
                                            {user?.displayName}

                                        </span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                        <li>
                                            <Link className="dropdown-item" to="/settings">Settings</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button onClick={handleLogOut} className="dropdown-item">Sign out</button>
                                        </li>
                                    </ul>
                                </div>


                            </ul>

                        </div>
                    </div>
                    <div className="col-md-10 d-flex flex-column h-sm-100">

                    <div className="d-none d-sm-inline bg-danger-subtle">
                    <div className=" align-items-center d-flex justify-content-between w-100">

                        <div>
                            <h1>Dashboard</h1>
                        </div>

                        <div>
                            <div className="input-group">
                                <input className="form-control py-2 border-right-0 border" type="" placeholder='Search something' id="example-search-input" />
                                <span className="input-group-append">
                                    <button className="border-0 btn fs-5" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                                    </button>
                                </span>
                            </div>
                        </div>

                        <div className="d-flex fs-5 gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>

                        </div>



                        <div className=" dropdown  flex-shrink-1">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user?.photoURL} alt="hugenerd" width="32" height="32" className="rounded-circle" />
                                <span className=" mx-1 text-dark">
                                    {user?.displayName}
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li>
                                    <Link className="dropdown-item" to="/settings">Settings</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="dropdown-item">Sign out</button>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>




                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;
