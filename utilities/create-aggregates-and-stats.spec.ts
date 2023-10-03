import {
  createAggregates,
  createStats,
  pruneOptionsForMultiSelect,
} from "./create-aggregates-and-stats";
import { sampleFiltersData } from "./sample-data/sample-filters-data";

describe("Data Processing Utilities", () => {
  describe("createAggregates", () => {
    it("should return a comma-separated string of labels for string type fields", () => {
      const expected = "System,Discipline";
      const result = createAggregates(sampleFiltersData);
      expect(result).toBe(expected);
    });

    it("should return an empty string for no string type fields", () => {
      const data = sampleFiltersData.filter((item) => item.type !== "string");
      expect(createAggregates(data)).toBe("");
    });
  });

  describe("createStats", () => {
    it("should return a comma-separated string of labels for number and date type fields", () => {
      const expected = "WEIGHT (DRY),CALIBRATION DATE,CALIBRATION DATE 2";
      const result = createStats(sampleFiltersData);
      expect(result).toBe(expected);
    });

    it("should return an empty string for no number or date type fields", () => {
      const data = sampleFiltersData.filter(
        (item) => item.type !== "number" && item.type !== "date"
      );
      expect(createStats(data)).toBe("");
    });
  });

  describe("pruneOptionsForMultiSelect", () => {
    it("should remove options from string type fields", () => {
      const prunedData = pruneOptionsForMultiSelect(sampleFiltersData);

      prunedData.forEach((data) => {
        if (data.type === "string") {
          expect(data.options).toBeUndefined();
        } else {
          expect(data).toEqual(expect.objectContaining(data));
        }
      });
    });

    it("should not modify the input formData", () => {
      const cloneBefore = JSON.parse(JSON.stringify(sampleFiltersData));
      pruneOptionsForMultiSelect(sampleFiltersData);
      expect(sampleFiltersData).toEqual(cloneBefore);
    });
  });
});
