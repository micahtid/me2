import { create } from 'zustand';
import { DocumentData } from 'firebase/firestore';

interface UserModal {
    isModalOpen: boolean;
    onModalOpen: () => void;
    onModalClose: () => void;
    currentUser: DocumentData | null;
    onChangeCurrentUser: (newUser: DocumentData) => void;
}

export const useUserModal = create<UserModal>((set) => ({
    isModalOpen: false,
    onModalOpen: () => set({ isModalOpen: true }),
    onModalClose: () => set({ isModalOpen: false }),
    currentUser: null,
    onChangeCurrentUser: (newUser: DocumentData) => set({ currentUser: newUser })
}));
