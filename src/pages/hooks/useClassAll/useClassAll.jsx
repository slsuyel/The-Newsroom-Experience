import { useQuery } from "@tanstack/react-query";

const useClassAll = () => {
    const { refetch, data: allClass = [], isLoading } = useQuery({
        queryKey: ["addclass",],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addclasses`)
            return res.json()
        },
    })
    return [allClass, refetch, isLoading]
};



export default useClassAll;