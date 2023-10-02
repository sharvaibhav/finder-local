import { SearchResponse } from "@/pages/api/search";
import LoadingBox from "../reusable/filters-loader/filters-loader";
import { memo, useEffect, useRef } from "react";
import useCurrentFilterStore, {
  selectCurrentFilters,
} from "@/stores/current-filters-store";
import { compareFormData } from "@/utilities/compare-formdata";
import {
  createAggregates,
  createStats,
} from "@/utilities/create-aggregates-and-stats";
import useSearchRequestStore, {
  selectSearchRequest,
  selectUpdateSearchRequest,
} from "@/stores/search-request-store";
import { useSearchResults } from "@/hooks/search-results";

export const NUMBER_OF_COLUMNS = 12;

const ResultsGridComponent: React.FC = () => {
  const request = useSearchRequestStore(selectSearchRequest);
  const currentFilters = useCurrentFilterStore(selectCurrentFilters);
  const setRequest = useSearchRequestStore(selectUpdateSearchRequest);
  const prevFormDataValue = useRef(currentFilters);
  const { data: results, isLoading } = useSearchResults(request);

  /**
   * This useEffect takes care we dont fire unnecessary http calls.
   */
  useEffect(() => {
    if (currentFilters && currentFilters?.length) {
      /**
       * Here we wrote a function to identify if the form data selection or min/max values are same,
       * then possibly there are no changes on the form selection,
       * only the options have changed according to new data from search results aggregations and stats.
       * So lets not change the request and not let the http call fire.
       */
      if (
        prevFormDataValue.current &&
        compareFormData(prevFormDataValue.current, currentFilters)
      ) {
        return;
      }
      prevFormDataValue.current = currentFilters;
      // creating aggregates and stats from formData
      const aggregate = createAggregates(currentFilters);
      const stats = createStats(currentFilters);
      setRequest({
        aggregate,
        stats,
        filters: currentFilters,
      });
    }
  }, [currentFilters, setRequest]);

  if (isLoading) {
    return <LoadingBox items={15} orientation="vertical" />;
  }
  if (!results?.results.length) {
    return <div>No results</div>;
  }
  return (
    <div>
      <h1 className="px-2 pb-4">Search Results ({results?.hits})</h1>
      <div className="flex headers py-2 border-b bg-gray-200">
        {results &&
          results.hits > 0 &&
          Object.entries(results?.results[0])
            .slice(0, NUMBER_OF_COLUMNS)
            .map(([key, _]) => (
              <div
                key={key}
                className="header px-2 overflow-hidden whitespace-nowrap overflow-ellipsis border-r">
                {key}
              </div>
            ))}
      </div>
      {results?.results.map((result: any, index: number) => (
        <div key={index} className="flex results bg-gray-100">
          {Object.entries(result)
            .slice(0, NUMBER_OF_COLUMNS)
            .map(([key, value]: [key: string, value: any]) => (
              <div
                key={key}
                className="result px-2 py-2 overflow-hidden whitespace-nowrap overflow-ellipsis border-r">
                {value}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export const ResultsGrid = memo(ResultsGridComponent);
