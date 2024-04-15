import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface AttributeType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    category: number[];
    category_title: {
      title: string;
    }[];
    id: number;
    title: string;
    values: Array<{
      id: number;
      value: string;
    }>;
  }>;
}

const useGetAttributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: () => {
      return request.get<AttributeType>("/attribute/").then((res) => res.data);
    },
  });
};

export default useGetAttributes;
