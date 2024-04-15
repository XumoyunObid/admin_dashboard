import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useDeleteBanners = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/banner/${id}/`).then((res) => res.data),
  });
};

export default useDeleteBanners;
