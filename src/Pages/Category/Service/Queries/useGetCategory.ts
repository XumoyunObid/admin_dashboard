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

const useGetCategories = (page: number) => {
  return useQuery({
    queryKey: ["category", page],
    queryFn: () => {
      return request
        .get<CategoryType>("/category/", {
          params: {
            limit: 20, // Assuming 20 items per page
            offset: (page - 1) * 20, // Calculate the offset based on page number
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useGetCategories;
