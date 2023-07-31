import { create } from "zustand";

type RentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// モーダル状態を管理するカスタムフック
const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
