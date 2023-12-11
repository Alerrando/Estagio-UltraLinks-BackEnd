import { useContext, useEffect, useState } from "react";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { infosByCpf } from "../../api";
import { AsideAdm } from "../../components/AsideAdm";
import { CardsAdm } from "../../components/CardsAdm";
import { StoreContext } from "../../context";
import "./Adm.css";
import { TableDeposit } from "./TableDeposit";
import { TableTransfer } from "./TableTransfer";

export function Adm(){
    const [datasAdmCard, setDatasAdmCard] = useState([]);
    const [tableCurrent, setTableCurrent] = useState("Depositos-Feitos");
    const useStore = useContext(StoreContext);
    const { user } = useStore();

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
                setDatasAdmCard(datas.message);
            }
        })()
    }, []);
    
    return(
        <>
            <AsideAdm />

            <main className="w-[calc(100%_-_4%)] h-screen ml-auto">
                <div className="w-10/12 h-auto flex flex-col gap-12 items-center mx-auto py-8">
                    <div className="w-full flex items-center justify-between">
                        <CardsAdm 
                            iconCard={<FaRegMoneyBill1 size={28} className="text-white" />}
                            colorPrinc={"#3AB1B9"}
                            textBodyCard={"Dinheiro na conta"} 
                            numberMoney={datasAdmCard?.user?.total_value}
                        />

                        <CardsAdm 
                            iconCard={<FaRegMoneyBill1 size={28} className="text-white" />}
                            colorPrinc={"rgb(22 163 74)"}
                            textBodyCard={"Dinheiro depositado no total"} 
                            numberMoney={datasAdmCard?.deposits?.length === 0 ? 0 : datasAdmCard?.deposits?.reduce((sum, val) => sum + val.value, 0)}
                        />

                        <CardsAdm 
                            iconCard={<FaRegMoneyBill1 size={28} className="text-white" />}
                            colorPrinc={"rgb(220 38 38)"}
                            textBodyCard={"Dinheiro transferido no total"} 
                            numberMoney={datasAdmCard?.transfer?.length === 0 ? 0 : datasAdmCard?.transfer?.reduce((sum, val) => sum + val.value, 0)}
                        />
                    </div>

                    <div className="w-full group-buttons-box flex items-center">
                        <button className={`border border-[#D8DEE4] py-2 px-4 ${tableCurrent}`} 
                            onClick={() => setTableCurrent("Depositos-Feitos")}
                        >
                            Depositos Feitos
                        </button>

                        <button className={`border border-[#D8DEE4] py-2 px-4 ${tableCurrent}`} 
                            onClick={() => setTableCurrent("Transferencias-Feitas")}
                        >
                            Transferências Feitas
                        </button>
                    </div>

                    <table className="w-full bg-white border border-gray-200 shadow-md rounded-md">
                        {renderizarDados()}
                    </table>
                </div>


            </main>
        </>
    );

    function renderizarDados() {
        switch (tableCurrent) {
          case "Depositos-Feitos":
            return (
              <TableDeposit allDeposits={datasAdmCard?.deposits} />
            );
          case "Transferencias-Feitas":
            return (
              <TableTransfer allTransfer={datasAdmCard?.transfer} />
            );
          default:
            return null;
        }
    }
}