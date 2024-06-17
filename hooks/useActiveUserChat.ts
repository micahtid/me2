import { create } from 'zustand';
import { DocumentData } from 'firebase/firestore';

interface activUsereChat {
  currentUser: DocumentData | null;
  currentChat: string;
  isChatComplete: boolean;
  setChatComplete: (newStatus: boolean) => void;
  onChange: (newUser: DocumentData | null, newChatId: string) => void;
}

export const useActiveUserChat= create<activUsereChat>((set) => ({
  currentUser: null,
  currentChat: "",
  isChatComplete: false,
  setChatComplete: (newStatus: boolean) => set({ isChatComplete: newStatus }),
  onChange: (newUser: DocumentData | null, newChatId: string) => set({ currentUser: newUser, currentChat: newChatId }),
}));
