import React, { useMemo, useCallback, FC } from "react";
import { MultiSelect, Option } from "../reusable/multi-select";
import useCurrentColumnsStore, {
  selectCurrentColumns,
} from "@/stores/columns-selector-store";
import { generateHash } from "@/utilities/hash-generator.utility";
import { useSearchResults } from "@/hooks/search-results";
import useSearchRequestStore, {
  selectSearchRequest,
} from "@/stores/search-request-store";

const currentColumnsToOptions = (currentColumns: string[]) => {
  return currentColumns.map((column) => {
    return {
      id: generateHash(column),
      name: column,
      value: column,
    };
  });
};

export const ColumnsSelector: FC = () => {
  const currentColumns = useCurrentColumnsStore(selectCurrentColumns);
  const currentOptions = useMemo(
    () => currentColumnsToOptions(currentColumns),
    [currentColumns]
  );

  const currentSearchRequest = useSearchRequestStore(selectSearchRequest);
  const searchResults = Object.keys(
    useSearchResults(currentSearchRequest).data?.results[0] || []
  );

  const completeOptionList = useMemo(
    () =>
      searchResults.map((column) => {
        return {
          id: generateHash(column),
          name: column,
          value: column,
        };
      }),
    [searchResults]
  );

  const onChange = useCallback((selectedOptions: Option[]) => {
    const selectedColumns = selectedOptions.map((option) => option.value);
    useCurrentColumnsStore.setState({ currentColumns: selectedColumns });
  }, []);

  return (
    <div>
      <MultiSelect
        label="Select Columns"
        defaultValue={currentOptions}
        options={completeOptionList}
        onChange={onChange}
      />
    </div>
  );
};
