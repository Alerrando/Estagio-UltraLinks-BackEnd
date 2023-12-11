import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Login } from "./pages/Login";
import { Adm } from "./pages/Adm";
import { Deposit } from "./pages/Adm/Deposit";

export type RouterRole = {
    path: string;
};

export const routesRole: RouterRole[] = [
    {
      path: "/login",
    },
    {
      path: "/",
    },
    {
      path: "/adm",
    },
    {
      path: "/adm/depositar",
    },
  ];
export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adm" element={<Adm />} />
                <Route path="/adm/deposito" element={<Deposit />} />
            </Routes>
        </BrowserRouter>
    )
}