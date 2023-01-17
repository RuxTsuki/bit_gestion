import { Dispatch, createContext } from "react";
import { GlobalSnackbar, GlobalSnackbarActionType } from "./globalSnackbar.types";

export const GlobalSnackbarContext = createContext<GlobalSnackbar>(null!);

export const GlobalSnackbarDispatch = createContext<Dispatch<GlobalSnackbarActionType> | null>(null);
