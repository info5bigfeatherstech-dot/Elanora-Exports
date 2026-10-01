import { create } from 'zustand';
import { ToastMessage } from '../types';

interface UIState {
  isSearchModalOpen: boolean;
  isMobileMenuOpen: boolean;
  specSheetModalProduct: any | null;
  sampleRequestModalProduct: any | null;
  toasts: ToastMessage[];

  openSearch: () => void;
  closeSearch: () => void;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;

  openSpecSheetModal: (product: any) => void;
  closeSpecSheetModal: () => void;

  openSampleRequestModal: (product: any) => void;
  closeSampleRequestModal: () => void;

  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchModalOpen: false,
  isMobileMenuOpen: false,
  specSheetModalProduct: null,
  sampleRequestModalProduct: null,
  toasts: [],

  openSearch: () => set({ isSearchModalOpen: true }),
  closeSearch: () => set({ isSearchModalOpen: false }),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openSpecSheetModal: (product) => set({ specSheetModalProduct: product }),
  closeSpecSheetModal: () => set({ specSheetModalProduct: null }),

  openSampleRequestModal: (product) => set({ sampleRequestModalProduct: product }),
  closeSampleRequestModal: () => set({ sampleRequestModalProduct: null }),

  addToast: (title, description, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, title, description, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
