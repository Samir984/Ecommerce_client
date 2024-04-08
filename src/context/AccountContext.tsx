import React, {
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type AccountState = {
  accountMode: string;
  loggedIn: boolean;
  email: string;
  fullName: string;
  dispatch: React.Dispatch<ActionType>;
};

const AccountStateContext = createContext<AccountState | undefined>(undefined);

type AccountStateType = {
  accountMode: string;
  loggedIn: boolean;
  avatar: {
    url: string;
    public_id: string;
  };
  email: string;
  fullName: string;
  role: string;
  _id: string;
};

type ActionType =
  | { type: "accountMode"; payload: string }
  | { type: "customerSignup"; payload: Partial<AccountStateType> }
  | { type: "signin"; payload: Partial<AccountStateType> }
  | { type: "signout" };

type AccountStateProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const initialState: AccountStateType = {
  accountMode: "",
  loggedIn: false,
  avatar: {
    url: "",
    public_id: "",
  },
  email: "",
  fullName: "",
  role: "",
  _id: "",
};

function reducer(
  state: AccountStateType,
  action: ActionType
): AccountStateType {
  switch (action.type) {
    case "accountMode":
      return { ...state, accountMode: action.payload };
    case "customerSignup":
      return { ...state, ...action.payload };
    case "signin":
      return { ...state, loggedIn: true };
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

  const { accountMode, email, fullName, loggedIn } = state;

  useEffect(() => {
    setStoreAccountState(state);
  }, [setStoreAccountState, state]);

  return (
    <AccountStateContext.Provider
      value={{ dispatch, accountMode, email, fullName, loggedIn }}
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
