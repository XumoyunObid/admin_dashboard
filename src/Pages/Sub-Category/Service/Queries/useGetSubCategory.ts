import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface SubCategoryType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    image: string;
    title: string;
    parent: {
      id: number;
      image: string;
      title: string;
    };
  }>;
}

const useGetSubCategories = (page: number) => {
  return useQuery({
    queryKey: ["sub-category", page],
    queryFn: () => {
      return request
        .get<SubCategoryType>("/api/subcategory/", {
          params: {
            limit: 20,
            offset: (page - 1) * 20,
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useGetSubCategories;
