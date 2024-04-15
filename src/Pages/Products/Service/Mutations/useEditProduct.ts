import { useMutation } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

const useEditProduct = () => {
  const { id } = useParams();
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch(`/product/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useEditProduct;
