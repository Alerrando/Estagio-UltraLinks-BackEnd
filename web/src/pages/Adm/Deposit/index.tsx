import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { deposit, infosByCpf } from "../../../api";
import { AsideAdm } from "../../../components/AsideAdm";
import CreateHeaderRegisters from "../../../components/CreateHeaderRegisters";
import { Modal } from "../../../components/Modal";
import { InputConfig, StoreContext, UserProps } from "../../../context";
import { TableDeposit } from "../TableDeposit";

const schema = z.object({
    user_cpf: z.string().nonempty("Campo Nome é obrigatório!"),
    value: z.string().nonempty("Campo valor é obrigatório!"),
})

export type SchemaDeposit = z.infer<typeof schema>;

export function Deposit(){
    const [modal, setModal] = useState<boolean>(false);
    const [datesUser, setDatesUser] = useState([]);
    const useStore = useContext(StoreContext);
    const { user, setUser } = useStore();
    const inputs: InputConfig[] = [
        {
          htmlFor: "cpf",
          label: "Cpf",
          name: "user_cpf",
          placeholder: "99999999999",
          type: "text",
          habilited: true,
        },
    
        {
          htmlFor: "valor",
          label: "Valor do depósito",
          name: "value",
          placeholder: "Depósito",
          type: "number",
          habilited: false,
        },
    ]

    useEffect(() => {
        (async () => {
            const pathName = window.location.pathname;
            if (pathName !== "/") {
                if (pathName.includes("/adm") && user.token.length === 0) {
                    window.location.href = "/";
                }
            }
            const cpfConvert = user.cpf.replace(/[.-]/g, "")
            const datas = await infosByCpf(cpfConvert, user.token);

            if(datas.status){
                setDatesUser(datas.message);
            }
        })()
    }, []);

    return(
        <>
            <AsideAdm />
            <main className="w-[calc(100%_-_4%)] h-screen ml-auto px-6">
                <div className="w-full flex flex-col gap-4  py-3">
                    <h1 className="text-3xl md:text-[42px]">Fazer Depósito</h1>

                    <CreateHeaderRegisters setModal={setModal} totalRegiter={datesUser.length} />
                </div>

                <table className="w-full bg-white border border-gray-200 shadow-md rounded-md">
                    <TableDeposit allDeposits={datesUser?.deposits} />
                </table>

                {modal && (
                    <Modal 
                        modalName="deposit" 
                        setModal={setModal} 
                        title="Depositar" 
                        createFormSchema={schema} 
                        inputs={inputs}
                        submitInfos={submitDeposit}
                    />
                )}
                <ToastContainer />
            </main>
        </>
    );


    async function submitDeposit(e: SchemaDeposit){
        const register: SchemaDeposit = {
            user_cpf: user.cpf.replace(/[.-]/g, ""),
            value: parseFloat(e.value)
        }

        const aux = await deposit(register, user.token);

        if(aux.status){
            const cpfConvert = user.cpf.replace(/[.-]/g, "")
            const datas = await infosByCpf(cpfConvert, user.token);

            if(datas.status){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { total_value, ...userRest } = user;
                
                const userAux: UserProps = {
                    ...userRest,
                    total_value: datas.message.user.total_value
                }
                setUser(userAux);
            }
        }
    }
}