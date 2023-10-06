import React, { useMemo, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { sortOptions } from "./multi-select-utility";

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

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options = [],
  defaultValue = [],
  onChange = () => {},
}) => {
  const formattedOptions = useMemo(
    () => sortOptions(defaultValue, options),
    [defaultValue, options]
  );
  const [localOptions, setLocalOptions] = useState([...formattedOptions]);
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<Option[]>(defaultValue);
  const dropdownRef = useRef<HTMLElement>(null);

  function isSelected(currentOption: Option) {
    return selection.find((el) => el.value === currentOption.value)
      ? true
      : false;
  }

  function handleApply() {
    onChange(selection, label);
    setIsOpen(false);
  }

  function handleSelect(value: Option) {
    if (isSelected(value)) {
      setSelection((prev) => prev.filter((item) => item.id !== value.id));
    } else {
      if (!selection.some((item) => item.id === value.id)) {
        setSelection((prev) => [...prev, value]);
      }
    }
  }

  function updateOptions(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const filteredOptions = formattedOptions.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setLocalOptions(filteredOptions);
    // setLocalOptions(filteredOptions);
  }

  useEffect(() => {
    setLocalOptions(formattedOptions);
  }, [formattedOptions]);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full ">
        <Listbox as="div" className="space-y-1" ref={dropdownRef}>
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
                  <div className="flex relative">
                    <input
                      type="text"
                      className="  w-full border-2 border-gray-300 rounded p-1 m-2"
                      onChange={updateOptions}
                    />
                    <MagnifyingGlassIcon className="absolute cursor-pointer mt-1 h-6  text-gray-600  right-3 top-3 " />
                  </div>
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                    {localOptions.map((item) => {
                      const selected = isSelected(item);
                      return (
                        <Listbox.Option
                          key={item.id}
                          value={item}
                          className=" pl-2"
                          onClick={() => handleSelect(item)}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-8 pr-4 `}>
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate`}>
                                {item.value}
                              </span>
                              <span
                                className={`${
                                  active ? "text-white" : "text-gray-600"
                                } absolute inset-y-0 left-0 w-1/4 flex items-center `}>
                                <CheckCircleIcon
                                  className={`cursor-pointer mr-3 h-7 top-2 right-2 ${
                                    selected
                                      ? " text-gray-900 hover:text-gray-950"
                                      : " text-gray-200 hover:text-gray-300"
                                  }`}
                                />
                              </span>
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
