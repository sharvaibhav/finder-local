import { Metadata } from "@/types/data.interface";
import { generateHash } from "./hash-generator.utility";
import { FormField, FormFields } from "@/components/filters/filter.model";

const crerateFormFieldsForAvailableFilters = (
  formData: FormFields,
  metaData: { [key: string]: Metadata }
) => {
  const filteredData = Object.entries(metaData).filter(
    (item1) => !formData.some((item2) => item1[0] === item2["label"])
  );
  const diff = filteredData.map(([label, metadata]) => {
    switch (metadata.dataType) {
      case "string": {
        return {
          label: label,
          type: metadata.dataType,
          options: Object.entries(metaData[label].values).map(([_, value]) => ({
            id: generateHash(value),
            name: `${value}`,
            value: value,
          })),
        } as unknown as FormField;
      }
      case "date":
      case "number": {
        return {
          label: label,
          type: metadata.dataType,
          rangeMin: metaData[label]?.min,
          rangeMax: metaData[label]?.max,
        } as unknown as FormField;
      }
    }
  });
  return diff as FormFields;
};

export default crerateFormFieldsForAvailableFilters;
