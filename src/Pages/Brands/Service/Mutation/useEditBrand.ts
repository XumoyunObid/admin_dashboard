import { useMutation } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

const useEditBrand = () => {
  const { id } = useParams();

  return useMutation({
    mutationKey: ["edit-brand"],
    mutationFn: (data: FormData) =>
      request
        .patch(`/brand/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useEditBrand;
