
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const UseUserRole = () => {
    const { user } = useContext(AuthContext);

    const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://ass-12-server-slsuyel.vercel.app/users/admin/${user?.email}`);
            const data = await res.json();
            // console.log('user role response', data);
            return data.role;
        },
        enabled: !!user?.email,
    });
    return [userRole, isUserRoleLoading];
}
export default UseUserRole;
