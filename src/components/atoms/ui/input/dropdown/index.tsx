import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Fragment } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { INPUTSIZE } from "../textInput";

interface IOption {
  label: string;
  value: string | boolean;
}

interface IDropdown {
  label: string;
  name: string;
  options: IOption[];
  className?: string;
  size?: "sm" | "md" | "lg";
  labelClassName?: string;
  placeholder?: string;
  required?: boolean;
  control: Control;
  multiple?: boolean;
  [key: string]: any;
}

function DropdownComponent({
  options,
  label,
  labelClassName = "",
  size = "sm",
  required = true,
  placeholder,
  error,
  control,
  onChange,
  name,
  multiple,
}: any) {
  const currentSelectedValue =
    useWatch({
      name,
      control: control as Control,
    }) || [];

  const inputSizeClassName = (INPUTSIZE as any)[`${size}`];

  return (
    <>
      <Listbox
        name={name}
        value={currentSelectedValue}
        onChange={onChange}
        by='value'
        multiple={multiple}
      >
        {({ open }) => (
          <div className='space-y-2'>
            {label && (
              <Listbox.Label
                className={clsx(
                  "block text-sm font-medium text-gray-700",
                  labelClassName
                )}
              >
                {label}
                <span
                  className={clsx({
                    "text-red-500": required,
                    hidden: !required,
                  })}
                >
                  *
                </span>
              </Listbox.Label>
            )}
            <div className='mt-1 relative'>
              <Listbox.Button
                className={clsx(
                  "bg-neutral-100 relative w-full border border-gray-100 rounded-xl text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm",
                  inputSizeClassName,
                  error[name]
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-50"
                    : ""
                )}
              >
                {multiple ? (
                  currentSelectedValue && currentSelectedValue.length ? (
                    <span className='block truncate'>{`Selected ${label}s (${currentSelectedValue.length})`}</span>
                  ) : (
                    <span>{`Select ${label}`}</span>
                  )
                ) : (
                  <span className='block truncate'>
                    {currentSelectedValue?.label || (
                      <span className='text-gray-400'>
                        {placeholder || "Select one"}
                      </span>
                    )}
                  </span>
                )}
                <span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <ChevronDownIcon
                    className='h-5 w-5 text-gray-900'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                  <Listbox.Option
                    value={undefined}
                    disabled
                    className='cursor-default select-none relative py-2 pl-3 pr-9 text-gray-400'
                  >
                    Select One
                  </Listbox.Option>
                  {options.map((option: IOption, i: number) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        clsx(
                          active
                            ? "text-primary-500 bg-neutral-100"
                            : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? "text-white" : "text-primary-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
      {currentSelectedValue && currentSelectedValue.length ? (
        <div className='grid auto-cols-fr grid-flow-col gap-1 my-2'>
          {currentSelectedValue.map((val: any) => (
            <div
              key={val.value}
              className='bg-gray-100 rounded-full flex justify-center items-center p-2'
            >
              <p className='text-xs text-center'>{val.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      {error[name] && (
        <div className='text-red-500 text-xs my-2 px-1'>
          {error[name]?.message}
        </div>
      )}
    </>
  );
}

export const Dropdown: React.FC<IDropdown> = (props: IDropdown) => {
  const {
    label,
    name,
    className = "",
    labelClassName = "",
    size = "md",
    required = true,
    placeholder,
    options,
    multiple = false,
    control,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, name }, formState: { errors } }: any) => {
        return (
          <div className='my-2'>
            <DropdownComponent
              control={control}
              onChange={onChange}
              name={name}
              placeholder={placeholder}
              error={errors}
              required={required}
              options={options}
              label={label}
              size={size}
              className={className}
              labelClassName={labelClassName}
              multiple={multiple}
            />
          </div>
        );
      }}
    />
  );
};
