import { create } from "zustand"

interface UIStore {
  isCartOpen: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  setIsCartOpen: (open: boolean) => void
  setIsMobileMenuOpen: (open: boolean) => void
  setIsSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>()((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
}))
