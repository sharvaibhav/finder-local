import { create } from "zustand";
import { produce } from "immer";

interface ColumnSelectorState {
  currentColumns: string[];
  setColumns: (query: string[]) => void;
  addColumn: (aggregate: string) => void;
  removeColumn: (removeColumn: string) => void;
  resetDefault: () => void;
}

const useCurrentColumnsStore = create<ColumnSelectorState>((set) => ({
  currentColumns: ["id", "Description"],
  setColumns: (columns: string[]) =>
    set((state) =>
      produce(state, (draft) => {
        draft.currentColumns = columns;
      })
    ),
  addColumn: (column: string) =>
    set((state) =>
      produce(state, (draft) => {
        draft.currentColumns.push(column);
      })
    ),
  removeColumn: (removeColumn: string) =>
    set((state) =>
      produce(state, (draft) => {
        draft.currentColumns = draft.currentColumns.filter(
          (column) => column !== removeColumn
        );
      })
    ),
  resetDefault: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.currentColumns = ["id", "Description"];
      })
    ),
}));

export default useCurrentColumnsStore;

export const selectCurrentColumns = (state: ColumnSelectorState) =>
  state.currentColumns;
export const selectSetCurrentColumns = (state: ColumnSelectorState) =>
  state.setColumns;
export const selectSetAddColumn = (state: ColumnSelectorState) =>
  state.addColumn;
export const selectSetRemoveColumn = (state: ColumnSelectorState) =>
  state.removeColumn;
export const selectSetResetDefault = (state: ColumnSelectorState) =>
  state.resetDefault;
