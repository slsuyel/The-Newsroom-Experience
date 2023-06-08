/* import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const UseInstructor = () => {
    const { user } = useContext(AuthContext)

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
            console.log('is admin response', res)
            return res.data;
        }
    })
    return [isInstructor, isInstructorLoading]
}

export default UseInstructor; */

import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const UseUserRole = () => {
    const { user } = useContext(AuthContext);

    const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
            const data = await res.json();
            // console.log('user role response', data);
            return data.role;
        },
        enabled: !!user?.email,
    });
    return [userRole, isUserRoleLoading];
}
export default UseUserRole;
