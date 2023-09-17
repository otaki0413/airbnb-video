"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";

import { Button } from "@/app/_components/Button";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export const Modal: FC<ModalProps> = ({
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
}) => {
  // モーダルの表示状態を管理するフラグ、初期値にはzustandで指定したfalseがひとまず入る
  const [showModal, setShowModal] = useState(isOpen);

  // 外部からのisOpenの変更を検知してモーダルを表示する
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // モーダル閉じる処理
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handelSubmit = useCallback(() => {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          {/* CONTENT */}
          <div
            className={`h-full duration-300 ${showModal ? "translate-y-0" : "translate-y-full"} ${
              showModal ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
              <div onClick={handleClose} className="relative flex items-center justify-center rounded-t border-b p-6">
                <button className="absolute right-9 border-0 p-1 transition hover:opacity-70">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel ? (
                    <Button disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} outline />
                  ) : null}
                  <Button disabled={disabled} label={actionLabel} onClick={handelSubmit} />
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
