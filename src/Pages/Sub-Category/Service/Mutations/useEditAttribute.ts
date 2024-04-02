import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useEditAttribute = (id: string) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.patch(`/attribute/${id}/`, data).then((res) => res.data),
  });
};

export default useEditAttribute