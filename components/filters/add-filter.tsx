import useMetaHook from "@/hooks/meta-hook";
import useAvailableFiltersStore, {
  selectAvailableFilters,
  selectSetAvailableFilters,
} from "@/stores/available-filters-store";
import useCurrentFilterStore, {
  selectAddFilterToCurrentFilters,
  selectCurrentFilters,
} from "@/stores/current-filters-store";
import crerateFormFieldsForAvailableFilters from "@/utilities/create-form-fields-for-available-filters";
import { Popover } from "@headlessui/react";
import { useEffect, useMemo } from "react";
import LoadingBox from "../reusable/filters-loader/filters-loader";
import { FormField } from "./filter.model";

export const AddFilter: React.FC = () => {
  const { data: metaData, isLoading: isLoadingMeta } = useMetaHook();
  const currentFilters = useCurrentFilterStore(selectCurrentFilters);
  const setAvailableFilters = useAvailableFiltersStore(
    selectSetAvailableFilters
  );
  const addFilterToCurrentFilters = useCurrentFilterStore(
    selectAddFilterToCurrentFilters
  );
  const availableFilters = useAvailableFiltersStore(selectAvailableFilters);

  /**
   * This use memo takes care of creating form fields for available filters
   */
  const availableFormData = useMemo(() => {
    if (currentFilters?.length > 0 && metaData) {
      return crerateFormFieldsForAvailableFilters(currentFilters, metaData);
    }
    return [];
  }, [currentFilters, metaData]);

  /**
   * This use effect takes care of list for add filter functionality
   */
  useEffect(() => {
    if (availableFormData.length > 0) {
      setAvailableFilters(availableFormData);
    }
  }, [availableFormData, setAvailableFilters]);

  const addFilter = (filter: FormField) => {
    if (currentFilters) {
      switch (filter.type) {
        case "string": {
          addFilterToCurrentFilters({ ...filter, selection: [] });
          break;
        }
        case "number":
        case "date": {
          addFilterToCurrentFilters({
            ...filter,
            min: undefined,
            max: undefined,
          });
        }
      }
    }
  };
  if (isLoadingMeta) {
    return (
      <div>
        <LoadingBox items={1} orientation="horizontal" />
      </div>
    );
  }
  return (
    <Popover className="py-2 relative">
      {({ open }) => (
        <>
          <Popover.Button className="p-2 bg-blue-200 text-blue-800 rounded-md shadow-md hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300">
            Add Filter{" "}
          </Popover.Button>

          <Popover.Panel className="border border-gray-300 bg-white rounded-md max-h-60 z-20  overflow-y-auto  absolute">
            {availableFilters.map((filter: FormField) => (
              <span key={filter.label}>
                <button
                  className="p-2 w-full text-left	  bg-white text-blue-800 hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={addFilter.bind(null, filter)}>
                  {filter.label}
                </button>
              </span>
            ))}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
