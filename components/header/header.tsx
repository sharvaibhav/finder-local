import useSearchRequestStore, {
  selectSetQueryString,
} from "@/stores/search-request-store";
import { debounce } from "lodash";
import { ChangeEvent } from "react";

const SearchBar: React.FC = () => {
  const setSearchString = useSearchRequestStore(selectSetQueryString);
  const debouncedQueryHandler = debounce(setSearchString, 500);
  const queryStringHandler = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedQueryHandler(event.target.value);
  };

  return (
    <>
      <div className=" w-full">
        <div className="flex items-center">
          <input
            type="text"
            className="w-full h-10 px-4 mr-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter your search query..."
            onChange={queryStringHandler}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
