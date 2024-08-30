import { create } from 'zustand';

interface RoomModal {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}

export const useRoomModal = create<RoomModal>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false })
}));