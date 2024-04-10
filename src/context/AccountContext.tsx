import React, {
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ReducerStateType = {
  _id: string;
  accountMode: "SELLER" | "BUYER" | "ADMIN" | "";
  loggedIn: boolean;
  avatar: {
    url: string;
    public_id: string;
  };
  storeExits: boolean;
  email: string;
  fullName: string;
  role?: string;
};

type AccountStateType = ReducerStateType & {
  dispatch: React.Dispatch<ActionType>;
};

const AccountStateContext = createContext<AccountStateType | undefined>(
  undefined
);

type ActionType =
  | { type: "accountMode"; payload: "SELLER" | "BUYER" | "ADMIN" | "" }
  | { type: "signup"; payload: Partial<ReducerStateType> }
  | { type: "signin"; payload: Partial<ReducerStateType> }
  | { type: "storeCreated" }
  | { type: "signout" };

type AccountStateProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialState: ReducerStateType = {
  accountMode: "",
  loggedIn: false,
  avatar: {
    url: "",
    public_id: "",
  },
  storeExits: false,
  email: "",
  fullName: "",
  role: "",
  _id: "",
};

function reducer(
  state: ReducerStateType,
  action: ActionType
): ReducerStateType {
  switch (action.type) {
    case "accountMode":
      return { ...state, accountMode: action.payload };
    case "signup":
      return { ...state, ...action.payload, loggedIn: false };
    case "signin":
      return { ...state, ...action.payload, loggedIn: true };
    case "storeCreated":
      return { ...state, storeExits: true };
    case "signout":
      return { ...initialState };
    default:
      throw new Error("Unexpected action");
  }
}

export default function AccountStateProvider({
  children,
}: AccountStateProviderProps) {
  const [storeAccountState, setStoreAccountState] = useLocalStorage(
    "AccountState",
    initialState
  );
  const [state, dispatch] = useReducer(reducer, storeAccountState);

  console.log("AccountStateProvider Context ");
  const {
    _id,
    avatar: { public_id, url },
    accountMode,
    email,
    fullName,
    loggedIn,
    storeExits,
  } = state;

  useEffect(() => {
    setStoreAccountState(state);
  }, [setStoreAccountState, state]);

  return (
    <AccountStateContext.Provider
      value={{
        dispatch,
        accountMode,
        email,
        fullName,
        avatar: { public_id, url },
        storeExits,
        loggedIn,
        _id,
      }}
    >
      {children}
    </AccountStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountState() {
  const context = useContext(AccountStateContext);
  if (!context) {
    throw new Error(
      "useAccountState must be used within an AccountStateProvider"
    );
  }
  return context;
}
