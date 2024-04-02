import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useDeleteAttribute = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
  });
};

export default useDeleteAttribute;
