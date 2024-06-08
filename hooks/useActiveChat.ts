import { create } from 'zustand';

interface activeChat {
  currentChat: string;
  onChange: (newChatId: string) => void;
}

export const useActiveChat= create<activeChat>((set) => ({
  currentChat: "",
  onChange: (newChatId: string) => set({ currentChat: newChatId }),
}));
