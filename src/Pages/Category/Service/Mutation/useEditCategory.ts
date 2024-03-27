import { useMutation } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

const useEditCategory = () => {
  const { id } = useParams();

  return useMutation({
    mutationKey: ["edit-category"],
    mutationFn: (data: FormData) =>
      request
        .patch(`/category/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useEditCategory;
