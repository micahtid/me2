import { create } from 'zustand';
import { DocumentData } from 'firebase/firestore';

interface activUsereChat {
  currentUser: DocumentData | null;
  currentChat: string;
  onChange: (newUser: DocumentData, newChatId: string) => void;
}

export const useActiveUserChat= create<activUsereChat>((set) => ({
  currentUser: null,
  currentChat: "",
  onChange: (newUser: DocumentData, newChatId: string) => set({ currentUser: newUser, currentChat: newChatId }),
}));
