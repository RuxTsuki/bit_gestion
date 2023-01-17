import { Dispatch, createContext } from "react";
import { AuthActionsType, AuthState } from "./auth.types";
import { authInitialState } from "./reducer/authReducer";

export const AuthStateContext = createContext<AuthState>(authInitialState);

export const AuthDispatchContext = createContext<Dispatch<AuthActionsType> | null>(null);
