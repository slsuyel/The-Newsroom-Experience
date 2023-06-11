// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../../../provider/AuthProviders";

// const useUser = (email) => {
//   const { user } = useContext(AuthContext);
//   const { refetch, data: userData = null } = useQuery({
//     queryKey: ["user", email],
//     queryFn: async () => {
//       const res = await fetch(`/users/email?email=${user?.email}`);
//       return res.json();
//     },
//   });

//   return [userData, refetch];
// };

// export default useUser;
