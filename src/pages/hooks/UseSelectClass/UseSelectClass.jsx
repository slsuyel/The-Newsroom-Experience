// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../../../provider/AuthProviders";
// const UseSelectClass = () => {

    
//     const { user } = useContext(AuthContext)
//     const { refetch, data: selectedClass = [], isLoading } = useQuery({
//         queryKey: ["selectedClasses", user?.email],
//         queryFn: async () => {
//             const res = await fetch(`https://ass-12-server-eight.vercel.app/selectedClasses?email=${user?.email}`)
//             return res.json()
//         },
//     })
//     return [selectedClass, refetch, isLoading]
// };

// export default UseSelectClass; 

import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const UseSelectClass = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: selectedClass = [], isLoading } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await fetch(`https://ass-12-server-eight.vercel.app/selectedClasses?email=${user?.email}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  return [selectedClass, refetch, isLoading];
};

export default UseSelectClass;
