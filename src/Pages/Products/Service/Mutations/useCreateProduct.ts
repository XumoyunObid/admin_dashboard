import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post("/product/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useCreateProduct;
