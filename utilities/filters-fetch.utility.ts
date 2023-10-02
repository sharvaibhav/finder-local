import { SearchRequest } from "@/pages/api/search";

export const fetchMetaData = async () => {
  const response = await fetch("/api/meta", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const fetchSearchResults = async (query: SearchRequest) => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.query,
      aggregate: query.aggregate,
      stats: query.stats,
      filters: query.filters,
    }),
  });
  return response.json();
};
