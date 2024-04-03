import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useDeleteAttributeValue = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/attribute-value/${id}/`).then((res) => res.data),
  });
};

export default useDeleteAttributeValue;
