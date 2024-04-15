import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

const useSearchProduct = (search = "") => {
  return useQuery({
    queryKey: ["searchCategory", search],
    queryFn: () => {
      return request
        .get("/product/", { params: { search: search } })
        .then((res) => res.data);
    },
  });
};

export default useSearchProduct;
