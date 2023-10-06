import { Option } from "./multi-select";

export const sortOptions = (reference: Option[], options: Option[]) => {
  if (options.length === 0) return [];
  const referenceIds = reference?.map((item) => item.value);
  const optionsCopy = [...options]; // just in case Objects are frozen.
  return optionsCopy?.sort((a, b) => {
    const aExistsInReference = referenceIds.includes(a.value);
    const bExistsInReference = referenceIds.includes(b.value);

    if (aExistsInReference && bExistsInReference) {
      return 0; // If both exist in the reference list, keep their relative order
    }
    if (aExistsInReference) {
      return -1; // If a exists in the reference list, it should come first
    }
    if (bExistsInReference) {
      return 1; // If b exists in the reference list, it should come first
    }
    return 0; // If neither exists in the reference list, keep their relative order
  });
};
