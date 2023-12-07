import React, { HTMLInputTypeAttribute } from "react";
import { Path } from "react-hook-form";
import clsx from "clsx";
import { camalize } from "../../../../../utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface IInput {
  type?: HTMLInputTypeAttribute | "textArea" | "search";
  label?: Path<any>;
  name: string;
  size?: "sm" | "md" | "lg";
  inputClassName?: string;
  labelClassName?: string;
  register: any;
  required?: boolean;
  error?: string | undefined;
  [key: string]: any;
}

export const INPUTSIZE = { sm: "px-3 py-2", md: "px-3 py-4", lg: "px-3 py-8" };

export const Input: React.FC<IInput> = (props: IInput) => {
  const {
    type = "text",
    label = "",
    name,
    size = "md",
    inputClassName = "",
    labelClassName = "",
    register,
    required = true,
    error,
    ...args
  } = props;

  const labelId = camalize(label);
  const errorClass = error
    ? "border-red-500 focus:border-red-800 bg-red-50"
    : "";

  const inputSizeClassName = INPUTSIZE[`${size}`];

  const isSearch = type === "search";
  const isTextArea = type === "textArea";

  return (
    <div className='space-y-2 my-2  '>
      {label && (
        <label
          htmlFor={labelId}
          className={clsx(
            "block text-sm font-medium text-gray-700",
            labelClassName
          )}
        >
          {label}
          <span
            className={clsx({ "text-red-500": required, hidden: !required })}
          >
            *
          </span>
        </label>
      )}
      {!isTextArea && (
        <div className={clsx("mt-1 ", { "relative ": isSearch })}>
          {isSearch && (
            <MagnifyingGlassIcon
              className='h-6 w-6 text-gray-400 absolute top-4 left-4'
              aria-hidden='true'
            />
          )}
          <input
            id={labelId}
            type={type}
            className={clsx(
              "appearance-none block w-full  border border-gray-100 bg-neutral-100 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400 sm:text-sm",
              inputSizeClassName,
              { " pl-12": isSearch },
              inputClassName,
              errorClass
            )}
            {...register(name, { required: required })}
            {...args}
            autoComplete='off'
          />
          <div className='text-red-500 text-xs my-2 px-1'>{error}</div>
        </div>
      )}

      {isTextArea && (
        <div className='mt-1'>
          <textarea
            id={labelId}
            type={type}
            className={clsx(
              "appearance-none block w-full  border border-gray-100 bg-neutral-100 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400 sm:text-sm",
              inputSizeClassName,
              inputClassName,
              errorClass
            )}
            {...register(name, { required: required })}
            {...args}
            autoComplete='off'
          />
          <div className='text-red-500 text-xs my-2 px-1'>{error}</div>
        </div>
      )}
    </div>
  );
};
