import { create } from 'zustand';

interface activePage {
  currentPage: string;
  onChange: (newPage: string) => void;
}

export const useActivePage= create<activePage>((set) => ({
  currentPage: "",
  onChange: (newPage: string) => set({ currentPage: newPage }),
}));
