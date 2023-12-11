import { useState } from "react";
import { Header } from "../../components/Header";
import { FormLogin } from "./FormLogin";
import { FormRegister } from "./FormRegister";
import "./style.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Login(){
    const [pages, setPages] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState<string>("");

    return(
        <>
            <Header />

            <main className={`w-screen h-[calc(100vh-_64px)] grid grid-cols-login mt-[64px] 
                ${!pages ? "md:grid-cols-inputs-register" : "md:grid-cols-[60%_40%]"} md:grid-rows-none overflow-y-auto overflow-x-hidden ${animationClass}`}>
                <aside className={`h-full md:h-5/6 w-full flex items-center justify-center my-auto ${pages && "md:order-1"} overflow-hidden`}>
                    <img src={!pages ? "/public/aside-login.svg" : "/public/aside-register.svg"} alt="" className="w-10/12 h-full mx-auto" />
                </aside>

                <div className="w-full h-5/6 flex flex-col items-center my-auto px-8 gap-8 divide-y-2">
                    {!pages ? <FormLogin handleTogglePages={handleTogglePages} /> : <FormRegister handleTogglePages={handleTogglePages} />}
                </div>
            </main>

            <ToastContainer />
        </>
    );

    function handleTogglePages() {
        setAnimationClass(!pages ? "slide-left" : "slide-right");
        setPages(!pages);
    }
}