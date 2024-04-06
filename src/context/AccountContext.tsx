import { ReactNode, useContext, useState, createContext } from "react";

type AccountMode = {
  accountMode: string;
  setAccountMode: (mode: string) => void;
};

const AccountModeContext = createContext<AccountMode | undefined>(undefined);

type AccountModeProviderProps = {
  children: ReactNode;
};

export default function AccountModeProvider({
  children,
}: AccountModeProviderProps) {
  const [accountMode, setAccountMode] = useState("");
  const value = { accountMode, setAccountMode };
  console.log("AccontModeProvider:", accountMode);
  return (
    <AccountModeContext.Provider value={value}>
      {children}
    </AccountModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountMode() {
  const context = useContext(AccountModeContext);
  if (!context) {
    throw new Error(
      "useAccountMode must be used within an AccountModeProvider"
    );
  }
  return context;
}
