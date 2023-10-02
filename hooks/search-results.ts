import { SearchRequest, SearchResponse } from "@/pages/api/search";
import { fetchSearchResults } from "@/utilities/filters-fetch.utility";
import { useQuery } from "react-query";

export const useSearchResults = (query: SearchRequest) => {
  return useQuery<SearchResponse>(
    ["searchResults", query],
    () => fetchSearchResults(query),
    {
      enabled: !!query,
    }
  );
};
