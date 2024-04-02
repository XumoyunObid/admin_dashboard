import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateAttribute = () => {
  return useMutation({
    mutationKey: ["create-attribute"],
    mutationFn: (data: FormData) =>
      request.post("/attribute/", data).then((res) => res.data),
  });
};

export default useCreateAttribute;
