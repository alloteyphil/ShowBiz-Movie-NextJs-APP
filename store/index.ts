import { create } from "zustand";

export interface StoreState {
  authDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  setAuthDrawerOpen: (state: StoreState) => void;
  setSearchDrawerOpen: (state: StoreState) => void;
}

export const useStore = create<StoreState>((set) => ({
  authDrawerOpen: false,
  searchDrawerOpen: false,
  setAuthDrawerOpen: (state: StoreState) =>
    set({
      ...state,
      authDrawerOpen: !state.authDrawerOpen,
      searchDrawerOpen: false,
    }),
  setSearchDrawerOpen: (state: StoreState) =>
    set({
      ...state,
      searchDrawerOpen: !state.searchDrawerOpen,
      authDrawerOpen: false,
    }),
}));
