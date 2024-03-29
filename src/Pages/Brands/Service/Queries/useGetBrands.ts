import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface BrandsType {
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

const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => {
      return request.get<BrandsType>("/brand/").then((res) => res.data);
    },
  });
};

export default useGetBrands;
