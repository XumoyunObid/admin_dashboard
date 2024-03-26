import { QueryClient } from "react-query";

export const clientQuery = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
