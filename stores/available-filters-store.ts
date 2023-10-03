import { FormFields } from "@/components/filters/filter.model";
import { produce } from "immer";
import { create } from "zustand";

interface AvailableFiltersState {
  availableFilters: FormFields;
  setAvailableFilters: (newFormFields: FormFields) => void;
}

const useAvailableFiltersStore = create<AvailableFiltersState>((set) => ({
  availableFilters: [],
  setAvailableFilters: (newAvailableFilters) =>
    set((availableFiltersState) => {
      return produce(availableFiltersState, (draft) => {
        draft.availableFilters = newAvailableFilters;
      });
    }),
}));

export const selectAvailableFilters = (state: AvailableFiltersState) =>
  state.availableFilters;
export const selectSetAvailableFilters = (state: AvailableFiltersState) =>
  state.setAvailableFilters;

export default useAvailableFiltersStore;
