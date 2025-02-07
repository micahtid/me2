import { create } from 'zustand';

interface activePage {
  currentPage: string;
  onChange: (newPage: string) => void;
}

export const useActivePage= create<activePage>((set) => ({
  currentPage: "global",
  onChange: (newPage: string) => set({ currentPage: newPage }),
}));
