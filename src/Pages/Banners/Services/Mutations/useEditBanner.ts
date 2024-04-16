import { useMutation } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

const useEditBanner = () => {
  const { id } = useParams();

  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch(`/banner/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useEditBanner;
