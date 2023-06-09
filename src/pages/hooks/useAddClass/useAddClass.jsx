import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useAddClass = () => {
    const { user } = useContext(AuthContext)
    console.log(user.email);
    const { refetch, data: addclass = [], isLoading } = useQuery({
        queryKey: ["addclass", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addclasses?email=${user.email}`)
            return res.json()
        },
    })
    return [addclass, refetch, isLoading]
};

export default useAddClass;
