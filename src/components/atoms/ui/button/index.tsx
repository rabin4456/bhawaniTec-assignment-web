import clsx from "clsx";
import React from "react";

export interface IButton {
  type?: "button" | "submit" | "reset";
  buttonType?: "primary" | "secondary" | "link" | "danger";
  loading?: boolean;
  label: string;
  className?: string;
  fullWidth?: boolean;
  labelOnLeft?: boolean;
  icon?: JSX.Element;
  [key: string]: any;
}
export const Button: React.FC<IButton> = (props: IButton) => {
  const {
    type = "button",
    buttonType = "primary",
    loading = false,
    label,
    fullWidth = false,
    labelOnLeft = false,
    className = "",
    icon,
    ...args
  } = props;
  let buttonTypeClass = "";
  switch (buttonType) {
    case "primary":
      buttonTypeClass =
        "text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
      break;
    case "secondary":
      buttonTypeClass =
        "text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-gray-100 hover:bg-gray-200 ";
      break;
    case "danger":
      buttonTypeClass =
        "text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500";
      break;
    case "link":
      buttonTypeClass = "w-auto text-pink-600 underline hover:text-pink-500 ";
      break;
    default:
      buttonTypeClass =
        "text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500";
      break;
  }

  return (
    <>
      <button
        type={type}
        disabled={loading}
        className={clsx(
          fullWidth ? "w-full" : "",
          "flex px-10 py-3 font-bold text-base border border-transparent rounded-md shadow-sm   disabled:opacity-75 disabled:cursor-not-allowed ",
          labelOnLeft ? " justify-start" : " justify-center",
          buttonTypeClass,
          className
        )}
        {...args}
      >
        <>
          {loading && (
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          )}
          {icon && (
            <div
              className={
                buttonType == "primary"
                  ? "w-5 mr-1 text-white"
                  : buttonType == "danger"
                  ? "w-5 mr-1 text-white"
                  : "w-5 mr-1 text-primaryGreen"
              }
            >
              {icon}
            </div>
          )}
          {label}
        </>
      </button>
    </>
  );
};
