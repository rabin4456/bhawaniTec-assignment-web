import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { forwardRef, Fragment } from "react";
import { IButton } from "../../atoms/ui/button";
import { ModalHeader } from "../..";
import { ModalActions } from "../../atoms/ModalAction";

export type IModalProps = {
  open?: boolean;
  responsive?: boolean;
  children?: any;
  className?: string;
  onClose?: () => void;
  modalSize?: "xs" | "sm" | "md" | "lg" | "screen";
  isCloseable?: boolean;
  closeButtonClassName?: string;
  title?: string;
  hideHeader?: boolean;
  headerComponent?: React.FC<any>;
  headerClassName?: string;
  actions?: IButton[];
  actionClassName?: string;
  contentClassName?: string;
  onModalClose?: () => void;
  hideCloseIcon?: boolean;
  width?: string;
  position?: "right" | "left" | "bottom";
  isSidePane?: boolean;
};
export const Modal = forwardRef<HTMLDivElement, IModalProps>(
  (props, ref): JSX.Element => {
    const {
      children,
      open,
      className = "",
      modalSize = "sm",
      isCloseable = false,
      title,
      hideHeader = false,
      headerComponent: HeaderComponent,
      headerClassName = "",
      actions,
      actionClassName = "",
      contentClassName = "",
      onModalClose = () => {},
      hideCloseIcon = false,
      isSidePane = false,
      position,
    } = props;

    const modalClassName = clsx(
      "inline-block  max-h-[80vh]  bg-white  overflow-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-md ",
      {
        "max-w-[350px]": modalSize === "xs",
        "max-w-[500px]": modalSize === "sm",
        "max-w-[750px]": modalSize === "md",
        "max-w-[90%]": modalSize === "lg",
        "max-w-[97%] max-h-[90vh]": modalSize === "screen",
        "absolute m-0 rounded-none ": isSidePane,
        "right-0 h-screen  min-h-screen": position === "right",
        "left-0 h-screen  min-h-screen": position === "left",
        "bottom-0 left-0 w-full": position === "bottom",
      },
      className
    );

    const contentClasses = clsx(
      "p-0 m-0  flex-1 bg-white flex-col overflow-y-auto",
      contentClassName
    );

    return (
      <div>
        <Transition appear show={open} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-[99999] verflow-hidden'
            onClose={(e: any) => {
              if (e.target === e.currentTarget) {
                onModalClose();
              }
            }}
          >
            <div className='min-h-screen px-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-black/20 overflow-hidden' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle overflow-hidden'
                aria-hidden='true'
              ></span>

              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div ref={ref} className={modalClassName}>
                  <div className='flex flex-col relative'>
                    <div className='relative'>
                      {!hideHeader ? (
                        <ModalHeader
                          className={headerClassName}
                          onModalClose={onModalClose}
                          isCloseable={isCloseable}
                          hideCloseIcon={hideCloseIcon}
                        >
                          <>
                            {title && <h1>{title}</h1>}
                            {HeaderComponent && <HeaderComponent />}
                          </>
                        </ModalHeader>
                      ) : (
                        !hideCloseIcon && (
                          <div className='absolute right-3 top-1/2  -translate-y-1/2 font-light'>
                            {/* <Icon
                            source={XMarkIcon}
                            isSvg
                            size={25}
                            outlined="circular"
                            className="text-neutral-400 hover:bg-neutral-300 cursor-pointer hover:text-primary-0"
                            onClick={onModalClose}
                          /> */}
                            <XMarkIcon className='h-10 w-10' />
                          </div>
                        )
                      )}
                    </div>
                    <div className={contentClasses}>{children}</div>
                    {actions && (
                      <ModalActions
                        className={actionClassName}
                        actions={actions}
                      />
                    )}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  }
);
