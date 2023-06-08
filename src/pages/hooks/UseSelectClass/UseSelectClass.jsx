import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
const UseSelectClass = () => {
    const { user } = useContext(AuthContext)

    const {refetch, data : selectedClass = [] } = useQuery({
        queryKey: ["selectedClasses", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedClasses?email=${user?.email}`)
            return res.json()
        },
    })
    return [selectedClass, refetch]

};

export default UseSelectClass;