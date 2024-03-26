import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: (data: FormData) =>
      request
        .post("/category/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useCreateCategory;
