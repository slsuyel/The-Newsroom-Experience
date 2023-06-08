import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const useAddClass = () => {
    const { user } = useContext(AuthContext)

    const { refetch, data: addclass = [], isLoading } = useQuery({
        queryKey: ["addclass", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addclass?email=${user?.email}`)
            return res.json()
        },
    })
    return [addclass, refetch, isLoading]

};

export default useAddClass;