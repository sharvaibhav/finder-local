import { FormFields } from "@/components/filters/filter.model";

export const createAggregates = (formData: FormFields) => {
  const aggregates = formData
    ?.filter((data) => data.type === "string")
    .map((data) => data.label)
    .join(",");
  return aggregates;
};

export const createStats = (formData: FormFields) => {
  const stats = formData
    ?.filter((data) => data.type === "number" || data.type === "date")
    .map((data) => data.label)
    .join(",");
  return stats;
};

export const pruneOptionsForMultiSelect = (
  formData: FormFields
): FormFields => {
  const prunedFormData = formData.map((data) => {
    if (data.type === "string") {
      const { options, ...rest } = data;
      return rest;
    }
    return data;
  });
  return prunedFormData;
};
