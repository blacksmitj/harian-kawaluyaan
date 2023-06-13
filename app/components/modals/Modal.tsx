"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  step?: number;
  isEditable?: boolean;
  isForm?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  step,
  isEditable,
  isForm,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const stepsNumber = [0, 1, 2, 3, 4];

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none md:items-center focus:outline-none bg-neutral-800/70">
        {/* black screen */}
        <div
          onClick={handleClose}
          className={`md:hidden fixed inset-0 max-h-screen z-[0] transition-opacity duration-300
          ${isOpen ? "block" : "hidden"}
        `}
        ></div>
        <div className="absolute md:relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-[95%] lg:h-auto md:h-auto bottom-0">
          {/* CONTENT */}
          <div
            className={`
                translate
                duration-300
                h-full
                text-darker
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                  translate
                  h-full
                  lg:h-auto
                  md:h-auto
                  border-0
                  rounded-lg
                  relative
                  flex
                  flex-col
                  w-full
                  bg-white
                  outline-none
                  focus:outline-none
                "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  p-5
                  rounded-t
                  justify-center
                  relative
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-1 border-0
                    hover:text-accent
                    transition
                    absolute
                    right-9
                  "
                >
                  <IoMdClose size={16} />
                </button>
                <div className="text-base font-semibold">{title}</div>
              </div>
              {step !== undefined ? (
                <div className="flex flex-row mx-6 my-2 gap-2">
                  {stepsNumber.map((item) => (
                    <div
                      key={item}
                      className={`py-0.5 w-full rounded-full duration-500
                        ${item <= step ? "bg-primary" : "bg-primary/10"}
                        `}
                    ></div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {/* Body */}
              <div
                className={`relative px-6 flex-auto
              ${step !== undefined ? "pt-6" : ""}
              `}
              >
                {body}
              </div>
              {/* Footers */}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      neutral
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  {isEditable && (
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  )}
                  {isForm && (
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  )}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
