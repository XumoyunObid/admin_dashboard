import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useDeleteBrand = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
  });
};

export default useDeleteBrand;
