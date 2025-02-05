import { useQuery } from "@tanstack/react-query";
// import UseAuth from "./UseAuth";
import useAxiosSecure from "./AxiosHooks";
import UseAuth from "./UseAuth";
// import UseAxiosSecure from "./UseAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = UseAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      // const { data } = await axiosSecure(`/users/role/:`);
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      return data.role;
    },
  });
  return [role, isLoading];
};

export default useRole;