import { useMutation } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

const useEditSubCategory = () => {
  const { id } = useParams();
  return useMutation({
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

export default useEditSubCategory;
