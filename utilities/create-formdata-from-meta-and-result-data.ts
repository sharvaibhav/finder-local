import { AggregationsOrStats, SearchResponse } from "@/pages/api/search";
import { Metadata } from "@/types/data.interface";
import { Dictionary, keyBy } from "lodash";
import { generateHash } from "./hash-generator.utility";
import { FormField, FormFields } from "@/components/filters/filter-types";

/* Error message constants */
const ERROR_MESSAGES = {
  UNSUPPORTED_DATA_TYPE: (dataType: string) =>
    `Unsupported data type: ${dataType}`,
};

/* DataType enum */
enum DataType {
  STRING = "string",
  DATE = "date",
  NUMBER = "number",
  // Add more as needed
}

/**
 *  A function to create a FormField array from metadata and results data
 * @param metaData - A Dictionary of Metadata objects with label as key
 * @param resultsData - A SearchResponse object
 * @param prevFormData - A FormField array, this is the previous state of the form.
 * @returns  - A FormField array, This is the current state of the form.
 */
const createFormData = (
  metaData: { [key: string]: Metadata },
  resultsData: SearchResponse | null,
  prevFormData: FormFields | null
): FormFields => {
  if (!metaData || !resultsData) {
    return [];
  }

  const aggregationLabels = Object.keys(resultsData.aggregations);
  const statsLabel = Object.keys(resultsData.stats);
  const combinedLabels = prevFormData?.length
    ? prevFormData.map((data) => data.label)
    : [...aggregationLabels, ...statsLabel];

  const existingLabels = prevFormData?.map((data) => data.label) || [];
  const labelToFormFieldLookup = keyBy(prevFormData, "label");
  const updateSelection = combinedLabels.every((label) =>
    existingLabels.includes(label)
  );

  return combinedLabels.map((label) => {
    const meta = metaData[label];
    const dataType = meta.dataType as DataType;

    switch (dataType) {
      case DataType.STRING:
        return createStringField(
          label,
          dataType,
          resultsData.aggregations,
          updateSelection,
          labelToFormFieldLookup
        );

      case DataType.DATE:
      case DataType.NUMBER:
        return createDateOrNumberField(
          label,
          dataType,
          resultsData.stats,
          updateSelection,
          labelToFormFieldLookup
        );

      default:
        throw new Error(ERROR_MESSAGES.UNSUPPORTED_DATA_TYPE(dataType));
    }
  });
};

export default createFormData;

/**
 * A function to create a string Formfield object, Its a utility function to reduce function complexitty
 * @param label - A string label
 * @param dataType - A DataType enum
 * @param aggregations - An AggregationsOrStats object
 * @param updateSelection - A boolean value
 * @param lookup - A Dictionary of FormField objects with label as key
 * @returns
 */
const createStringField = (
  label: string,
  dataType: DataType,
  aggregations: AggregationsOrStats,
  updateSelection: boolean,
  lookup: Dictionary<FormField>
): FormField => ({
  label,
  type: dataType,
  options: Object.entries(aggregations[label]).map(([key, count]) => ({
    id: generateHash(key),
    name: `${key} (${count})`,
    value: key,
  })),
  selection: updateSelection ? lookup[label].selection : [],
});

/**
 * A function to create a date or number Formfield object, Its a utility function to reduce function complexitty
 * @param label - A string label
 * @param dataType - A DataType enum
 * @param stats - An AggregationsOrStats object
 * @param updateSelection - A boolean value
 * @param lookup - A Dictionary of FormField objects with label as key
 * @returns
 */
const createDateOrNumberField = (
  label: string,
  dataType: DataType,
  stats: AggregationsOrStats,
  updateSelection: boolean,
  lookup: Dictionary<FormField>
): FormField => ({
  label,
  type: dataType,
  rangeMin: stats[label]?.min,
  rangeMax: stats[label]?.max,
  min: updateSelection ? lookup[label]?.min : undefined,
  max: updateSelection ? lookup[label]?.max : undefined,
  value: updateSelection ? lookup[label]?.value : undefined,
});
