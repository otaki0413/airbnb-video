"use client";

import { Modal } from "@/app/_components/modals/Modal";
import useRentModal from "@/app/hooks/useRentModal";

// レンタル用のモーダル
export const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
      title="Airbnb your home!"
    />
  );
};
