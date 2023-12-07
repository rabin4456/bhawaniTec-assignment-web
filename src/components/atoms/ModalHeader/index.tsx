import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export interface IModalHeader {
  children: React.ReactNode;
  className?: string;
  onModalClose?: () => void;
  isCloseable?: boolean;
  hideCloseIcon?: boolean;
}

export const ModalHeader: React.FC<IModalHeader> = (props: IModalHeader) => {
  const {
    children,
    className,
    isCloseable = false,
    hideCloseIcon = false,
    onModalClose,
  } = props;
  const rootClassName = clsx(
    "py-5 px-6 pr-10  border-b-2 border-neutral-100 flex flex-row gap-5 items-center relative",
    { "pr-3": isCloseable },
    className
  );
  return (
    <div className={rootClassName}>
      <div className=' w-full mx-auto px-3'>
        {children}
        {!hideCloseIcon && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 font-light'>
            <XMarkIcon className='h-8 w-8 mr-4' onClick={onModalClose} />
          </div>
        )}
      </div>
    </div>
  );
};
