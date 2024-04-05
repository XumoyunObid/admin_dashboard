import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

const useSearchCategory = (search = "") => {
  return useQuery({
    queryKey: ["searchCategory", search],
    queryFn: () => {
      return request
        .get("/category/", { params: { search: search } })
        .then((res) => res.data);
    },
  });
};

export default useSearchCategory;
