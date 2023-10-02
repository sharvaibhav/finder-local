import { create } from "zustand";
import { produce } from "immer";
import { SearchRequest } from "@/pages/api/search";

interface SearchRequestState {
  searchRequest: SearchRequest;
  setQuery: (query: string) => void;
  setAggregate: (aggregate: string) => void;
  updateSearchRequest: (updatedFields: Partial<SearchRequest>) => void;
  clearSearchRequest: () => void;
}

const emptySearchRequest: SearchRequest = {
  query: " ",
  aggregate: "System,Discipline",
  stats: "CALIBRATED RANGE MAX",
  filters: [],
};

const initialSearchRequest: SearchRequest = {
  query: " ",
  aggregate: "System,Discipline",
  stats: "CALIBRATED RANGE MAX",
  filters: [],
};

const useSearchRequestStore = create<SearchRequestState>((set) => ({
  searchRequest: emptySearchRequest,
  setQuery: (query: string) =>
    set((state) =>
      produce(state, (draft) => {
        draft.searchRequest.query = query;
      })
    ),
  setAggregate: (aggregate) =>
    set((state) =>
      produce(state, (draft) => {
        draft.searchRequest.aggregate = aggregate;
      })
    ),
  updateSearchRequest: (updatedFields) =>
    set((state) =>
      produce(state, (draft) => {
        Object.assign(draft.searchRequest, updatedFields);
      })
    ),
  clearSearchRequest: () =>
    set((state) =>
      produce(state, (draft) => {
        Object.assign(draft.searchRequest, emptySearchRequest);
      })
    ),
  resetSearchRequest: () =>
    set((state) =>
      produce(state, (draft) => {
        Object.assign(draft.searchRequest, initialSearchRequest);
      })
    ),
}));

export default useSearchRequestStore;

export const selectSearchRequest = (state: SearchRequestState) =>
  state.searchRequest;
export const selectUpdateSearchRequest = (state: SearchRequestState) =>
  state.updateSearchRequest;
export const selectSetQueryString = (state: SearchRequestState) =>
  state.setQuery;
