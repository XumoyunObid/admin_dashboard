import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

interface AttrType {
  attributes: {
    attribute_id?: string;
    title: string;
    values: {
      value: string;
      value_id: string;
    }[];
  }[];
  category_id: string;
}

const useEditAttribute = () => {
  return useMutation((data: AttrType) =>
    request.patch(`/api/category_edit/`, data).then((res) => res.data)
  );
};

export default useEditAttribute;
