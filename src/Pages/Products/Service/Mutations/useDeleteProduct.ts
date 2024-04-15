import { useMutation} from "react-query";
import { request } from "../../../../Config/request";

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data)
  });
};

export default useDeleteProduct;
