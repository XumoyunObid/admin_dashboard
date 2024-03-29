import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["create-subcategory"],
    mutationFn: (data: FormData) =>
      request
        .post("/api/subcategory/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useCreateSubCategory;
