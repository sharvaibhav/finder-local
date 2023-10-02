import { Metadata } from "@/types/data.interface";
import { fetchMetaData } from "@/utilities/filters-fetch.utility";
import { useQuery } from "react-query";

const useMetaHook = () => {
  return useQuery<{
    [key: string]: Metadata;
  }>("searchMetaData", fetchMetaData);
};

export default useMetaHook;
