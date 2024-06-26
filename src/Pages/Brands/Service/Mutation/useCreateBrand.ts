import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateBrands = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post("/brand/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useCreateBrands;
