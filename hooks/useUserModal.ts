import { create } from 'zustand';

interface DeleteData {
  uid1: string;
  uid2: string;
  userName: string;
}

interface UserModal {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  deleteData: DeleteData | null;
  setDeleteData: (data: DeleteData) => void;
}

export const useUserModal = create<UserModal>((set) => ({
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
  deleteData: null,
  setDeleteData: (data: DeleteData) => set({ deleteData: data })
}));