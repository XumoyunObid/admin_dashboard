import { useQuery } from "react-query";
import { request } from "../../../../Config/request";
import { useParams } from "react-router-dom";

// interface SubCategoryType {
//   id: any;
//   title: string;
//   image: string;
//   attributes: {
//     id: number;
//     title: string;
//     values: {
//       id: number;
//       value: string;
//     }[];
//   }[];
//   parent: {
//     id: number;
//     title: string;
//   };
//   children: {
//     id: number;
//     title: string;
//     category_title: {
//       title: string;
//     }[];
//     category: number | [];
//   } | null;
// }

const useGetSingleAttribute = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["attribute"],
    queryFn: () => {
      return request.get(`/attribute/${id}/`).then((res) => res.data);
    },
  });
};

export default useGetSingleAttribute;
