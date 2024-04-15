import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface ProductsType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    category: number;
    id: number;
    image: string;
    title: string;
    price: string;
    is_available: boolean;
    is_new: boolean;
  }>;
}

const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return request.get<ProductsType>("/product/").then((res) => res.data);
    },
  });
};

export default useGetProducts;
