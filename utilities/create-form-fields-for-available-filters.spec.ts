import { generateHash } from "./hash-generator.utility";
import { FormFields } from "../components/filters/filter.model";
import createFormFieldsForAvailableFilters from "./create-form-fields-for-available-filters";
import { sampleMeta, sampleMeta2 } from "./sample-data/sample-meta-data";

describe("createFormFieldsForAvailableFilters", () => {
  it("should transform string dataType metadata into correct form field structure", () => {
    const formData: FormFields = []; // You can use existing form data if needed
    const result = createFormFieldsForAvailableFilters(formData, sampleMeta);

    const expected = [
      {
        label: "Owner",
        type: "string",
        options: sampleMeta.Owner.values.map((value) => ({
          id: generateHash(value),
          name: value,
          value,
        })),
      },
      // ... similar objects for other string dataType fields in sampleMeta
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it("should transform date dataType metadata into correct form field structure", () => {
    const formData: FormFields = []; // You can use existing form data if needed
    const result = createFormFieldsForAvailableFilters(formData, sampleMeta2);

    const expected = [
      {
        label: "createdTime",
        type: "date",
        // here you need to define the way you want to handle the date type, e.g. rangeMin and rangeMax
      },
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it("should exclude fields that are already present in formData", () => {
    const existingField = {
      label: "Owner",
      type: "string",
      options: sampleMeta.Owner.values.map((value) => ({
        id: generateHash(value),
        name: value,
        value,
      })),
    };

    const formData: FormFields = [existingField];
    const result = createFormFieldsForAvailableFilters(formData, sampleMeta);

    expect(result).not.toEqual(expect.arrayContaining([existingField]));
  });

  // Add more test cases as needed, for example, to check the correct handling of other data types, etc.
});
