import { create } from "zustand";

type RegisterModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// モーダル状態を管理するカスタムフック
const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
