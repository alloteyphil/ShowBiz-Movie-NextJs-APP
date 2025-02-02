import { create } from "zustand";

export interface DrawerStoreState {
  authDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  setAuthDrawerOpen: (state: DrawerStoreState) => void;
  setSearchDrawerOpen: (state: DrawerStoreState) => void;
  setMobileMenuOpen: (state: DrawerStoreState) => void;
}

export interface UserProfileStoreState {
  name: string | null;
  photo?: string;
  setName: (name: string, state: UserProfileStoreState) => void;
  setPhoto: (url: string, state: UserProfileStoreState) => void;
}

export const useDrawerStore = create<DrawerStoreState>((set) => ({
  authDrawerOpen: false,
  searchDrawerOpen: false,
  mobileMenuOpen: false,
  setAuthDrawerOpen: (state: DrawerStoreState) =>
    set({
      ...state,
      authDrawerOpen: !state.authDrawerOpen,
      searchDrawerOpen: false,
      mobileMenuOpen: false,
    }),
  setSearchDrawerOpen: (state: DrawerStoreState) =>
    set({
      ...state,
      searchDrawerOpen: !state.searchDrawerOpen,
      authDrawerOpen: false,
      mobileMenuOpen: false,
    }),

  setMobileMenuOpen: (state: DrawerStoreState) => {
    set({
      ...state,

      mobileMenuOpen: !state.mobileMenuOpen,
      searchDrawerOpen: false,
      authDrawerOpen: false,
    });
  },
}));

export const useUserProfileStore = create<UserProfileStoreState>((set) => ({
  name: null,
  photo: "",
  setName: (name: string, state: UserProfileStoreState) =>
    set({ ...state, name }),
  setPhoto: (url: string, state: UserProfileStoreState) =>
    set({ ...state, photo: url }),
}));
