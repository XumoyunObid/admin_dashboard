import { useQuery } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

interface CategoryType {
  id: any;
  title: string;
  image: string;
  attributes: {
    id: number;
    title: string;
    values: {
      id: number;
      value: string;
    }[];
  }[];
  children: {
    id: number;
    title: string;
    image: string;
  }[]|any;
}

const useGetSingleCategory = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => {
      return request
        .get<CategoryType>(`/category/${id}/`)
        .then((res) => res.data);
    },
  });
};

export default useGetSingleCategory;
