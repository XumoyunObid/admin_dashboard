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

const useGetSubCategories = () => {
  return useQuery({
    queryKey: ["sub-category"],
    queryFn: () => {
      return request
        .get<SubCategoryType>("/api/subcategory/")
        .then((res) => res.data);
    },
  });
};

export default useGetSubCategories;
