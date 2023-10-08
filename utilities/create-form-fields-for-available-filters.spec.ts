import { generateHash } from "./hash-generator.utility";
import { FormFields } from "../components/filters/filter.model";
import createFormFieldsForAvailableFilters from "./create-form-fields-for-available-filters";
import { sampleMeta, sampleMeta2 } from "./sample-data/sample-meta-data";

describe("createFormFieldsForAvailableFilters", () => {
  it("should transform string dataType metadata into correct form field structure", () => {
    const formData: FormFields = [];
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
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it("should transform date dataType metadata into correct form field structure", () => {
    const formData: FormFields = [];
    const result = createFormFieldsForAvailableFilters(formData, sampleMeta2);

    const expected = [
      {
        label: "createdTime",
        type: "date",
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
});
