//@ts-nocheck
import React, { memo, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export interface Option {
  id: string;
  name: string;
  value: string;
}

interface MultiSelectProps {
  label: string;
  defaultValue: Option[];
  options: Option[];
  onChange: (selectedOption: Option[], label: string) => void;
}

const TickIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const sortOptions = (reference, options) => {
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
export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options = [],
  defaultValue = [],
  onChange = () => {},
}) => {
  const formattedOptions = sortOptions(defaultValue, options);
  const [localOptions, setLocalOptions] = useState(formattedOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<Option[]>(defaultValue);
  const dropdownRef = useRef<HTMLElement>(null);
  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && selection.length > 0) {
      onChange(selection, label);
      // setSelection([]);
    }
  }, [isOpen, selection]);

  function isSelected(currentOption: Option) {
    return selection.find((el) => el.value === currentOption.value)
      ? true
      : false;
  }

  function handleApply() {
    // setSelection(tempSelection);
    onChange(selection, label);
    setIsOpen(false); // Optionally close the dropdown when "Apply" is clicked
  }

  function handleSelect(value: Option) {
    let selectedItemUpdated;
    if (!isSelected(value)) {
      selectedItemUpdated = [
        ...selection,
        localOptions.find((el) => el.id === value.id),
      ];
      setSelection(selectedItemUpdated);
    } else {
      selectedItemUpdated = selection.filter((el) => el.id !== value.id);
      setSelection(selectedItemUpdated);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setLocalOptions(formattedOptions); // Reset local options when dropdown is closed
    }
  }, [isOpen]);

  function updateOptions(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const filteredOptions = localOptions.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setLocalOptions(filteredOptions);
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full ">
        <Listbox
          as="div"
          className="space-y-1"
          value={selection}
          onChange={(value) => handleSelect(value)}
          ref={dropdownRef}
          open={isOpen}>
          {() => (
            <>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                    open={isOpen}>
                    <span className="block truncate">
                      {selection.length < 1
                        ? `${
                            defaultValue.length > 0
                              ? `${label} is ${defaultValue
                                  .map((val) => val.name)
                                  .join(",")}`
                              : label
                          }`
                        : ` ${label} is (${selection
                            .map((data) => data.value)
                            .join(",")})`}
                    </span>
                    <span className="w-4 absolute inset-y-0 right-0 flex items-center pointer-events-none">
                      <svg
                        className=" text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor">
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 z-10 w-full rounded-md bg-white shadow-lg">
                  <input type="text" onChange={updtaeOptions} />
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                    {localOptions.map((item) => {
                      const selected = isSelected(item);
                      return (
                        <Listbox.Option key={item.id} value={item}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-8 pr-4`}>
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate`}>
                                {item.value}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                                  <TickIcon />
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                  <button
                    onClick={handleApply}
                    className="w-full text-center py-2 bg-blue-500 text-white rounded-b-md hover:bg-blue-600">
                    Apply
                  </button>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};
