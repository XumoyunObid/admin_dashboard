import { useMutation } from "react-query";
import { request } from "../../../../Config/request";

const useCreateBanner = () => {
  return useMutation({
    mutationKey: ["create-banner"],
    mutationFn: (data: FormData) =>
      request
        .post("/banner/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};

export default useCreateBanner;
