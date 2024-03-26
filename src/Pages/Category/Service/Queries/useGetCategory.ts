import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface CategoryType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    image: string;
    title: string;
    children: Array<{
      id: number;
      image: string;
      title: string;
    }>;
  }>;
}

const useGetCategories = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => {
      return request.get<CategoryType>("/category/").then((res) => res.data);
    },
  });
};

export default useGetCategories;
