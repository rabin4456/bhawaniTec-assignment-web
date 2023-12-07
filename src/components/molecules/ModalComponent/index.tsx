import React, { forwardRef, useCallback } from "react";
import { Modal } from "../modal";
import { IButton } from "../..";

export interface IModalComponentProps {
  component?: React.FC<any>;
  props?: { [key: string]: unknown };
  onClose?: () => void;
  closeModal?: () => void;
  isOpen?: boolean;
  responsive?: boolean;
  children?: any;
  className?: string;
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
  hideCloseIcon?: boolean;
  position?: "right" | "left" | "bottom";
  isSidePane?: boolean;
  disable?: boolean;
}
export const MainModalComponent = forwardRef<
  HTMLDivElement,
  IModalComponentProps
>(
  (
    {
      isOpen,
      component: MainComponent,
      props,
      isCloseable = false,
      onClose = () => {},
      closeModal = () => {},
      disable = false,
      ...args
    }: IModalComponentProps,
    ref: any
  ) => {
    const onModalClose = useCallback(() => {
      if (isCloseable || disable) return;
      closeModal();
      onClose();
    }, [disable]);

    return (
      <Modal
        open={isOpen || false}
        onModalClose={onModalClose}
        {...args}
        ref={ref}
      >
        {MainComponent && <MainComponent {...props} isInModal={true} />}
      </Modal>
    );
  }
);
