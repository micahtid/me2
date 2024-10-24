import { create } from 'zustand';
import { DocumentData } from 'firebase/firestore';

interface RoomModal {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  activeRoom: DocumentData | null;
  setActiveRoom: (newActiveRoom: DocumentData | null) => void;
  isNewRoom: boolean;
  setIsNewRoom: (status: boolean) => void;
  isUpdated: boolean;
  setIsUpdated: (status: boolean) => void;
}

export const useRoomModal = create<RoomModal>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
  activeRoom: null,
  setActiveRoom: (newActiveRoom: DocumentData | null) => set({activeRoom: newActiveRoom}),
  isNewRoom: false,
  setIsNewRoom: (status: boolean) => set({isNewRoom: status}),
  isUpdated: false,
  setIsUpdated: (status: boolean) => set({isUpdated: status})
}));