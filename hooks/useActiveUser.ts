import { create } from 'zustand';
import { DocumentData } from 'firebase/firestore';

interface activeUser {
  currentUser: DocumentData | null;
  onChange: (newUser: DocumentData) => void;
}

export const useActiveUser = create<activeUser>((set) => ({
  currentUser: null,
  onChange: (newUser: DocumentData) => set({ currentUser: newUser }),
}));
