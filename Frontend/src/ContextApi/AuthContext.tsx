import React, { createContext, ReactNode } from "react";

interface AuthState {
  isAuth: boolean;
  userDetails: any; // You may want to replace "any" with a more specific type for userDetails
}

interface AuthContextProps {
  authState: AuthState;
  loginUser: () => void;
  logoutUser: () => void;
  recordings: any[];
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  let providerState: AuthContextProps = {
    authState: { isAuth: false, userDetails: null },
    loginUser: () => {},
    logoutUser: () => {},
    recordings: [],
  };

  const reducer = (status = providerState, action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "Preview_Record": {
        return { ...status, recording: payload };
      }
      default: {
        throw new Error("invalid action type");
      }
    }
  };
  console.log(providerState);

  return (
    <div>
      <AuthContext.Provider value={providerState}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
