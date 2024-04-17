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

const useGetBanners = (page: number) => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => {
      return request
        .get<BannersType>("/banner/", {
          params: {
            limit: 20,
            offset: (page - 1) * 20,
          },
        })
        .then((res) => res.data);
    },
  });
};

export default useGetBanners;
