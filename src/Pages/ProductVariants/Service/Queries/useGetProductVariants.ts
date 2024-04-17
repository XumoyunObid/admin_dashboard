import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface SubCategoryType {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    attribute_value: {}[];
    images: {}[];
    id: number;
    is_available: boolean;
    other_detail: string;
    price: string;
    price_with_discount: string | null;
    product: number;
    quantity: number;
    title: string;
  }[];
}

const useGetProductVariants = () => {
  return useQuery({
    queryKey: ["product-variants"],
    queryFn: () => {
      return request
        .get<SubCategoryType>("/product_variant/")
        .then((res) => res.data);
    },
  });
};

export default useGetProductVariants;
