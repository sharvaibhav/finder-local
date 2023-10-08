import React, { useEffect, useRef } from "react";
import MinMaxSlider from "../reusable/minMaxInput";
import { XMarkIcon as TrashIcon } from "@heroicons/react/20/solid";
import DateRangePicker, { Range } from "../reusable/date";

import useCurrentFilterStore, {
  selectCurrentFilters,
  selectDeleteFilter,
  selectSetCurrentFilters,
  selectUpdateFilter,
} from "@/stores/current-filters-store";
import { MultiSelect } from "../reusable/multi-select";
import useMetaHook from "@/hooks/meta-hook";
import { useSearchResults } from "@/hooks/search-results";
import useSearchRequestStore, {
  selectSearchRequest,
} from "@/stores/search-request-store";
import createFormData from "@/utilities/create-formdata-from-meta-and-result-data";
import LoadingBox from "../reusable/filters-loader/filters-loader";
import { FormField } from "./filter.model";
import { AddFilter } from "./add-filter";

const CurrentFiltersView: React.FC = () => {
  const currentFilters = useCurrentFilterStore(selectCurrentFilters);
  const setCurrentFilters = useCurrentFilterStore(selectSetCurrentFilters);
  const updateFilter = useCurrentFilterStore(selectUpdateFilter);
  const deleteFilter = useCurrentFilterStore(selectDeleteFilter);
  const request = useSearchRequestStore(selectSearchRequest);
  const prevFormDataValue = useRef(currentFilters);
  prevFormDataValue.current = currentFilters;

  /* Fetching data from meta data api */
  const { data: metaData, isLoading: isLoadingMeta } = useMetaHook();
  /* Fetching data from search results api */
  const { data: resultsData = null } = useSearchResults(request);

  /**
   * Here we create the form data from the meta data and results data.
   */
  useEffect(() => {
    if (metaData && resultsData) {
      const currentFilters = createFormData(
        metaData,
        resultsData,
        prevFormDataValue.current
      );
      setCurrentFilters(currentFilters);
    }
  }, [resultsData, metaData, setCurrentFilters]);

  if (isLoadingMeta) {
    return (
      <div>
        <LoadingBox items={3} orientation="horizontal" />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap">
      {currentFilters?.map(
        ({
          label,
          type,
          options,
          rangeMin,
          rangeMax,
          selection = [],
          value,
        }: FormField) => {
          if (type === "number" && rangeMin && rangeMax) {
            return (
              <div
                className={`w-2/12 p-1 flex mr-3   mt-1  border-l-2 rounded-lg `}
                key={label}>
                <div className={`w-11/12 `}>
                  <MinMaxSlider
                    key={label}
                    label={label}
                    minValue={rangeMin}
                    maxValue={rangeMax}
                    step={1}
                    defaultValue={value ? value : rangeMin}
                    onChange={(value) =>
                      updateFilter(label, { value, label, type })
                    }
                  />
                </div>
                <TrashIcon
                  className="cursor-pointer mt-1 w-1/6  h-7 text-blue-500 hover:text-blue-600 top-2 right-2"
                  style={{ fill: "currentColor" }}
                  onClick={() => deleteFilter(label)}
                />
              </div>
            );
          } else if (type === "string") {
            return (
              <div
                className={`w-2/12 p-1 flex mr-3 mt-1 rounded-lg `}
                key={label}>
                <div className={`w-11/12 `}>
                  <MultiSelect
                    label={label}
                    options={options ? options : []}
                    defaultValue={selection ? selection : []}
                    onChange={(options) =>
                      updateFilter(label, {
                        selection: options,
                      })
                    }
                  />
                </div>

                <TrashIcon
                  className="cursor-pointer mt-1 w-1/6 h-7 text-blue-500 hover:text-blue-600 top-2 right-2"
                  style={{ fill: "currentColor" }}
                  onClick={() => deleteFilter(label)}
                />
              </div>
            );
          } else if (type === "date") {
            return (
              <div
                className="w-2/12 p-1 flex mr-3  mt-1 border-l-2 rounded-lg	"
                key={label}>
                {
                  <div className="w-11/12">
                    <DateRangePicker
                      label={label}
                      min={rangeMin}
                      max={rangeMax}
                      onChange={({ startDate, endDate }: Range) =>
                        updateFilter(label, {
                          min: startDate?.getTime(),
                          max: endDate?.getTime(),
                        })
                      }
                    />
                  </div>
                }
                <TrashIcon
                  className=" cursor-pointer mt-1 w-1/6 h-7 text-blue-500 hover:text-blue-600 top-2 right-2"
                  style={{ fill: "currentColor" }}
                  onClick={() => deleteFilter(label)}
                />
              </div>
            );
          }
          return null;
        }
      )}
      <div className=" w-1/12">
        <AddFilter />
      </div>
    </div>
  );
};

export default CurrentFiltersView;
