import { FormField, FormFields } from "@/hooks/filters-hook";
import { produce } from "immer";
import { create } from "zustand";

interface CurrentFiltersState {
  currentFilters: FormFields;
  setCurrentFilters: (newFormFields: FormFields) => void;
  updateFilter: (label: string, field: Partial<FormField>) => void;
  delteFilter: (label: string) => void;
  resetCurrentFilters: () => void;
  addFilterToCurrentFilters: (newFilter: FormField) => void;
}

const useCurrentFilterStore = create<CurrentFiltersState>((set) => ({
  currentFilters: [],
  setCurrentFilters: (currentFilters) =>
    set((currentFiltersState) => {
      return produce(currentFiltersState, (draft) => {
        draft.currentFilters = currentFilters;
      });
    }),
  updateFilter: (label: string, field: Partial<FormField>) => {
    set((currentFiltersState) => {
      return produce(currentFiltersState, (draft) => {
        draft.currentFilters = currentFiltersState.currentFilters.map(
          (formField) => {
            if (formField.label === label) {
              return {
                ...formField,
                ...field,
              };
            }
            return formField;
          }
        );
      });
    });
  },
  addFilterToCurrentFilters: (newFilter: FormField) => {
    set((currentFiltersState) => {
      return produce(currentFiltersState, (draft) => {
        draft.currentFilters = [
          ...currentFiltersState.currentFilters,
          newFilter,
        ];
      });
    });
  },
  delteFilter: (label: string) => {
    set((currentFiltersState) => {
      return produce(currentFiltersState, (draft) => {
        draft.currentFilters = currentFiltersState.currentFilters.filter(
          (formField) => formField.label !== label
        );
      });
    });
  },
  resetCurrentFilters: () => {
    set((currentFiltersState) => {
      return produce(currentFiltersState, (draft) => {
        draft.currentFilters = [];
      });
    });
  },
}));

export const selectSetCurrentFilters = (state: CurrentFiltersState) =>
  state.setCurrentFilters;
export const selectCurrentFilters = (state: CurrentFiltersState) =>
  state.currentFilters;
export const selectUpdateFilter = (state: CurrentFiltersState) =>
  state.updateFilter;
export const selectDeleteFilter = (state: CurrentFiltersState) =>
  state.delteFilter;
export const selectResetCurrentFilters = (state: CurrentFiltersState) =>
  state.resetCurrentFilters;
export const selectAddFilterToCurrentFilters = (state: CurrentFiltersState) =>
  state.addFilterToCurrentFilters;

export default useCurrentFilterStore;

// export interface CounterState {
//   counter: number;
//   incrCounter: () => void;
// }
// const useCounter = create<CounterState>((set) => {
//   return {
//     counter: 0,
//     incrCounter: () =>
//       set((state: CounterState) => ({ counter: state.counter + 1 })),
//   };
// });

// export default useCounter;
