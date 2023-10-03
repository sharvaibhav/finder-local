import { compareFields, compareFormData } from "./compare-formdata";
import {
  sampleFiltersData as formData,
  sampleFiltersData2 as formData2,
} from "./sample-data/sample-filters-data";

describe("Filter Utility", () => {
  describe("compareFields", () => {
    it("should return true for identical string fields with empty selection", () => {
      const field1 = formData[0];
      const field2 = { ...field1, selection: [] };

      expect(compareFields(field1, field2)).toBeTruthy();
    });

    it("should return false for string fields with different selections", () => {
      const field1 = formData[0];
      const field2 = { ...field1, selection: [field1.options![0]] };

      expect(compareFields(field1, field2)).toBeFalsy();
    });

    it("should return true for identical number fields", () => {
      const field1 = formData[2];
      const field2 = { ...field1 };

      expect(compareFields(field1, field2)).toBeTruthy();
    });
    it("should return false for non identical date fields", () => {
      const field1 = formData[3];
      const field2 = formData[4];

      expect(compareFields(field1, field2)).toBeFalsy();
    });
    it("should return true for identical date fields", () => {
      const field1 = formData[3];
      const field2 = formData[3];

      expect(compareFields(field1, field2)).toBeTruthy();
    });
    it("should return false for string fields with one selection as undefined", () => {
      const field1 = { ...formData[0], selection: undefined };
      const field2 = { ...formData[0], selection: [formData[0].options![0]] };

      expect(compareFields(field1, field2)).toBeFalsy();
    });

    it("should return false for string fields with one selection as null", () => {
      const field1 = { ...formData[0], selection: null } as any;
      const field2 = { ...formData[0], selection: [formData[0].options![0]] };

      expect(compareFields(field1, field2)).toBeFalsy();
    });
    it("should return true for identical number fields with zero value", () => {
      const field1 = { ...formData[2], value: 0 };
      const field2 = { ...formData[2], value: 0 };

      expect(compareFields(field1, field2)).toBeTruthy();
    });
    it("should return false for string fields with selections in different order", () => {
      const field1 = {
        ...formData[0],
        selection: [formData[0].options![0], formData[0].options![1]],
      };
      const field2 = {
        ...formData[0],
        selection: [formData[0].options![1], formData[0].options![0]],
      };

      expect(compareFields(field1, field2)).toBeFalsy();
    });
    it("should return false for string fields with similar but distinct selection objects", () => {
      const option = { ...formData[0].options![0] };
      const field1 = { ...formData[0], selection: [formData[0].options![0]] };
      const field2 = { ...formData[0], selection: [option] };

      expect(compareFields(field1, field2)).toBeTruthy();
    });
  });

  describe("compareFormData", () => {
    it("should return true for identical form data arrays", () => {
      expect(compareFormData(formData, [...formData])).toBeTruthy();
    });

    it("should return false for form data arrays with different lengths", () => {
      expect(compareFormData(formData, formData2)).toBeFalsy();
    });
  });
});
