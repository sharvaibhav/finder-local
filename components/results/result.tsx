import React from "react";
import "./result.scss";
import { ResultsGrid } from "../result-grid/result-grid";
import CurrentFiltersView from "../filters/current-filters-view";
import { AddFilter } from "../filters/add-filter";
import { ColumnsSelector } from "./columns-selector";

const Result: React.FC = () => {
  return (
    <>
      <div className="py-4 px-4 bg-gray-200">
        <CurrentFiltersView />
        <AddFilter />
      </div>
      <ColumnsSelector />
      <ResultsGrid />
    </>
  );
};

export { Result };
