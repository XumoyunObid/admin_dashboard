import { useQuery } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

interface ProductType {
  id: any;
  title: string;
  image: string;
  price: string;
  is_available: boolean;
  is_new: boolean;
  category: number;
}

const useGetSingleProduct = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return request
        .get<ProductType>(`/product/${id}/`)
        .then((res) => res.data);
    },
  });
};

export default useGetSingleProduct;
