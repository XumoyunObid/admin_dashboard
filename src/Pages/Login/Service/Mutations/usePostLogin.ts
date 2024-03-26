import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

interface Data {
  phone_number: string;
  password: string;
}

const usePostUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: Data) =>
      request
        .post<{ token: string }>("/api/admin-login/", data)
        .then((res) => res.data),
  });
};

export default usePostUser;
