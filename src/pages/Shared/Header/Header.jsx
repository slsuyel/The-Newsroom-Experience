
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import logo from "../assets/floury-colored-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
// import profile from "../assets/profile.png";

import { AuthContext } from "../../../provider/AuthProviders";

function Header() {

    const { user, photo, logOut, } = useContext(AuthContext);
    // console.log(user, photo);
    const logoutBtn = () => {
        logOut();
    };

    return (
        <Navbar className="container border-bottom border-white" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-brand w-50">
                    <img
                        src='https://i.ibb.co/3zRyY5q/logo.png'
                        alt=""
                        width={"200px"}
                        className="img-fluid rounded-1"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className=" fw-bold">
                        <NavLink className="fs-5 mx-2 text-decoration-none" to="/">
                            Home
                        </NavLink>

                        <NavLink className="fs-5 mx-2 text-decoration-none" to="/instructors">
                            Instructors
                        </NavLink>
                        <NavLink className="fs-5 mx-2 text-decoration-none" to="/class">
                            Class
                        </NavLink>


                        {user ? (
                            <>
                                <>
                                    <NavLink className="fs-5 mx-2 text-decoration-none" to="dashboard/home">
                                        Dashboard
                                    </NavLink>
                                    <img
                                        className="border border-dark me-2 profile-dp rounded-circle"
                                        src={photo ? photo : 'https://i.ibb.co/4p5g5zS/profile.png'} width={'40px'}

                                        alt=""
                                    />

                                </>
                                <p
                                    onClick={logoutBtn}
                                    className="btn btn-info fw-semibold mb-0 mx-1"
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    Log Out
                                </p>
                            </>
                        ) : (
                            <NavLink className="fs-5 mx-2 text-decoration-none" to="/login">
                                Login
                            </NavLink>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
