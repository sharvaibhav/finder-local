import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddFilter } from "./add-filter";
import useMetaHook from "@/hooks/meta-hook";
import useAvailableFiltersStore, {
  selectAvailableFilters,
  selectSetAvailableFilters,
} from "@/stores/available-filters-store";
import useCurrentFilterStore, {
  selectAddFilterToCurrentFilters,
  selectCurrentFilters,
} from "@/stores/current-filters-store";
import {
  sampleFiltersData,
  sampleFiltersData2,
} from "@/utilities/sample-data/sample-filters-data";
import { sampleMeta2 } from "@/utilities/sample-data/sample-meta-data";

// Mocking the hooks and stores
jest.mock("@/hooks/meta-hook");
jest.mock("@/stores/available-filters-store");
jest.mock("@/stores/current-filters-store");

describe("AddFilter Component", () => {
  beforeEach(() => {
    (useMetaHook as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useAvailableFiltersStore as unknown as jest.Mock).mockReturnValue([]);
    (useCurrentFilterStore as unknown as jest.Mock).mockReturnValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state", () => {
    const { container } = render(<AddFilter />);
    expect(container.getElementsByClassName("loading-select-row")).toHaveLength(
      1
    );
  });

  it("should render Add Filter button when not loading", async () => {
    (useMetaHook as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
    });

    render(<AddFilter />);
    await waitFor(() =>
      expect(screen.getByText("Add Filter")).toBeInTheDocument()
    );
  });

  it("should call addFilter when a string filter is clicked", async () => {
    // Mock the data as per your requirements
    (useMetaHook as jest.Mock).mockReturnValue({
      data: sampleMeta2,
      isLoading: false,
    });
    (useAvailableFiltersStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectSetAvailableFilters) {
          return jest.fn();
        }
        if (selector === selectAvailableFilters) {
          return sampleFiltersData2;
        }
        return jest.fn();
      }
    );
    //mocked a store for function addFilterToCurrentFilters
    const addFilterToCurrentFilters = jest.fn();
    (useCurrentFilterStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectAddFilterToCurrentFilters) {
          return addFilterToCurrentFilters;
        }
        return jest.fn();
      }
    );

    const { container } = render(<AddFilter />);
    await waitFor(() =>
      expect(screen.getByText("Add Filter")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Add Filter"));

    await waitFor(() => expect(screen.getByText("System")).toBeInTheDocument());

    // triggered the event to add a filter
    fireEvent.click(screen.getByText("System"));

    expect(addFilterToCurrentFilters).toHaveBeenCalledWith({
      label: "System",
      type: "string",
      options: [
        {
          id: "7832",
          name: "32: Sub mechanical Sys",
          value: "32: Sub mechanical Sys",
        },
        {
          id: "ed73",
          name: "11: Test structure",
          value: "11: Test structure",
        },
        {
          id: "0940",
          name: "21: CRUDE HANDLING AND METERING",
          value: "21: CRUDE HANDLING AND METERING",
        },
      ],
      selection: [],
    });
  });

  it("should call addFilter when a number filter is clicked", async () => {
    // Mock the data as per your requirements
    (useMetaHook as jest.Mock).mockReturnValue({
      data: sampleMeta2,
      isLoading: false,
    });
    (useAvailableFiltersStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectSetAvailableFilters) {
          return jest.fn();
        }
        if (selector === selectAvailableFilters) {
          return sampleFiltersData2;
        }
        return jest.fn();
      }
    );
    //mocked a store for function addFilterToCurrentFilters
    const addFilterToCurrentFilters = jest.fn();
    (useCurrentFilterStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectAddFilterToCurrentFilters) {
          return addFilterToCurrentFilters;
        }
        return jest.fn();
      }
    );

    const { container } = render(<AddFilter />);
    await waitFor(() =>
      expect(screen.getByText("Add Filter")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Add Filter"));

    await waitFor(() =>
      expect(screen.getByText("WEIGHT (DRY)")).toBeInTheDocument()
    );

    // triggered the event to add a filter
    fireEvent.click(screen.getByText("WEIGHT (DRY)"));

    expect(addFilterToCurrentFilters).toHaveBeenCalledWith({
      label: "WEIGHT (DRY)",
      type: "number",
      rangeMin: 2,
      rangeMax: 19,
    });
  });

  it("should call addFilter when a date filter is clicked", async () => {
    // Mock the data as per your requirements
    (useMetaHook as jest.Mock).mockReturnValue({
      data: sampleMeta2,
      isLoading: false,
    });
    (useAvailableFiltersStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectSetAvailableFilters) {
          return jest.fn();
        }
        if (selector === selectAvailableFilters) {
          return sampleFiltersData2;
        }
        return jest.fn();
      }
    );
    //mocked a store for function addFilterToCurrentFilters
    const addFilterToCurrentFilters = jest.fn();
    (useCurrentFilterStore as unknown as jest.Mock).mockImplementation(
      (selector) => {
        if (selector === selectAddFilterToCurrentFilters) {
          return addFilterToCurrentFilters;
        }
        if (selector === selectCurrentFilters) {
          return sampleFiltersData;
        }
        return jest.fn();
      }
    );

    const { container } = render(<AddFilter />);
    await waitFor(() =>
      expect(screen.getByText("Add Filter")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Add Filter"));

    await waitFor(() =>
      expect(screen.getByText("CALIBRATION DATE")).toBeInTheDocument()
    );

    // triggered the event to add a filter
    fireEvent.click(screen.getByText("CALIBRATION DATE"));

    expect(addFilterToCurrentFilters).toHaveBeenCalledWith({
      label: "CALIBRATION DATE",
      max: undefined,
      min: undefined,
      rangeMax: 1698271104967,
      rangeMin: 1697320907371,
      type: "date",
    });
  });
});
