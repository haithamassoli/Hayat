import { create } from "zustand";
import { createThemeSlice, IThemeState } from "./themeSlice";
import { createSnackbarSlice, ISnackbarState } from "./snackbarSlice";
import { createAuthSlice, IAuthState } from "./authSlice";

interface IStore extends IAuthState, IThemeState, ISnackbarState {}

export const useStore = create<IStore>()((...a) => ({
  ...createThemeSlice(...a),
  ...createAuthSlice(...a),
  ...createSnackbarSlice(...a),
}));
