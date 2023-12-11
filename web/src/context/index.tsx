import { createContext } from "react";
import { GetState, SetState, StoreApiWithPersist, create } from "zustand";
import { persist } from "zustand/middleware";

export type InputConfig = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder?: string;
  name: string;
  habilited?: boolean;
};

export interface UserRegister {
  name: string,
  email: string,
  date_of_birth: Date,
  password: string,
  cpf: string,
  cep: string,
  address_number: number,
  total_value: float,
}

export type UserProps = {
  id: string,
  name: string,
  cpf: string,
  email: string,
  total_value: float,
  token: string,
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserValuesDefault: UserProps = {
    id: "",
    name: "",
    cpf: "",
    email: "",
    token: "",
    total_value: 0
}

export type ContextProps = {
    user: UserProps;
    setUser: (user: UserProps) => void;
};

const StoreContext = createContext<StoreApiWithPersist<ContextProps>>({} as StoreApiWithPersist<ContextProps>);

export const useNotionContext = create<
  ContextProps,
  SetState<ContextProps>,
  GetState<ContextProps>,
  StoreApiWithPersist<ContextProps>
>(
  persist<ContextProps>(
    (set: ContextProps) => ({
      user: UserValuesDefault,
      setUser: (user: UserProps) => set((state: ContextProps) => (state.user = user)),
    }),
    {
      name: "user",
      getStorage: () => localStorage,
    },
  ),
);

function StoreProvider({ children }) {
    return <StoreContext.Provider value={useNotionContext}>{children}</StoreContext.Provider>;
}
  
export { StoreContext, StoreProvider };