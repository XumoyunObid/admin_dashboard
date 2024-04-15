import { useQuery } from "react-query";
import { request } from "../../../../Config/request";

interface BannersType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    image: string;
    title: string;
    created_at: string;
    updated_at: string;
    description: string | null;
  }>;
}

const useGetBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => {
      return request.get<BannersType>("/banner/").then((res) => res.data);
    },
  });
};

export default useGetBanners;
