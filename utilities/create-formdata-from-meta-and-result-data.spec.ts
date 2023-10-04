import { SearchResponse } from "@/pages/api/search";
import { Metadata } from "@/types/data.interface";
import { FormFields } from "@/components/filters/filter.model";
import createFormData from "./create-formdata-from-meta-and-result-data";
import { sampleFiltersData } from "./sample-data/sample-filters-data";
import { sampleMeta, sampleMeta2 } from "./sample-data/sample-meta-data";
import { searchResultsData } from "./sample-data/search-results-data";

describe("createFormData utility", () => {
  let metaData: { [key: string]: Metadata };
  let resultsData: SearchResponse;
  let prevFormData: FormFields;

  beforeAll(() => {
    metaData = { ...sampleMeta, ...sampleMeta2 };
    resultsData = searchResultsData;
    prevFormData = sampleFiltersData;
  });

  it("should return an empty array if metaData or resultsData is not provided", () => {
    const formData = createFormData(null, null, null);
    expect(formData).toEqual([]);
  });

  it("should create form data from provided metaData and resultsData", () => {
    const formData = createFormData(metaData, resultsData, null);
    expect(formData.length).toBeGreaterThan(0);
  });

  it("should update selection if prevFormData is provided", () => {
    const formData = createFormData(metaData, resultsData, prevFormData);
    // Assuming 'System' is one of the labels and its selections should be updated
    const systemField = formData.find((field) => field.label === "System");

    const preSelection = prevFormData?.find(
      (field) => field.label === "System"
    )?.selection;
    expect(systemField?.selection).toEqual(preSelection);
  });
});
