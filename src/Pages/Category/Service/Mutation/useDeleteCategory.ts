import { useMutation} from "react-query";
import { request } from "../../../../Config/request";

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data)
  });
};

export default useDeleteCategory;
