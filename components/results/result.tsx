import React from "react";
import "./result.scss";
import { ResultsGrid } from "../result-grid/result-grid";
import CurrentFiltersView from "../filters/current-filters-view";
import { AddFilter } from "../filters/add-filter";
import { ColumnsSelector } from "./columns-selector";
import { useSearchResults } from "@/hooks/search-results";
import useSearchRequestStore, {
  selectSearchRequest,
} from "@/stores/search-request-store";

const Result: React.FC = () => {
  const request = useSearchRequestStore(selectSearchRequest);
  const { data: results, isLoading } = useSearchResults(request);

  return (
    <>
      <div className="py-4 px-4 bg-gray-200">
        <CurrentFiltersView />
        <AddFilter />
      </div>
      <div className=" py-4  w-full  flex justify-between ">
        <div>
          Total number of hits - <strong>{results?.hits}</strong>
        </div>
        <div className="w-1/3">
          <ColumnsSelector />
        </div>
      </div>
      <ResultsGrid />
    </>
  );
};

export { Result };
