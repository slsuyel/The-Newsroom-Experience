/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";

const DashHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="border">
            <h3 className="border-2 border-bottom border-danger border-top col-md-4 mb-5 mx-auto py-2 text-center mt-5">{user.displayName}'s Dashboard</h3>
            <div className="align-items-center d-sm-flex justify-content-between mx-3">
                <h3>{user.displayName}</h3>

                <div>
                    <input className="d-inline input-group-text" type="text" placeholder="Search Something" />
                    <button className="btn btn-primary mb-1 ms-3">Search</button>
                </div>
                <img src={user.photoURL} alt="" className="rounded-circle" width={'60px'} />
            </div>
            <img src="https://i.ibb.co/F4M2xPp/ddddddddddd.png" alt="" className="mt-3 mx-0 w-100" draggable={false} />
        </div>
    );
};

export default DashHome;