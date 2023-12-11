import { BiSolidDashboard } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

export function AsideAdm(){
    return(
        <>
            <aside className={`h-full w-[4%] fixed left-0 top-0 z-[101] transition-all hover:w-[12%]`}>
                <div className="w-full h-full bg-[#FAFAFA] flex flex-col gap-4">
                    <div className="w-full h-auto flex items-center justify-center py-3">
                        <CgMenuGridO className="cursor-pointer" size={32} />
                    </div>

                    <div className="h-full flex flex-col items-center mb-auto">
                        <ul className="w-full h-auto flex flex-col gap-3 p-0">
                            <li className="w-full flex items-center py-1 px-4 overflow-hidden hover:bg-[#458ACE] cursor-pointer group">
                                <Link className="text-black flex flex-row items-center" to="/adm" className="flex flex-row gap-4 group">
                                    <BiSolidDashboard size={26} className="text-black group-hover:text-white" />
                                    <span className="block font-semibold group-hover:text-white">Dashboard</span>
                                </Link>
                            </li>
                        
                            <li className="w-full flex items-center py-1 px-4 overflow-hidden hover:bg-[#458ACE] cursor-pointer group">
                                <Link to="/adm/deposito" className="flex flex-row gap-4 items-center">
                                    <BsPeopleFill size={26} className="text-black group-hover:text-white" />
                                    <span className="block font-semibold group-hover:text-white">Depósito</span>
                                </Link>
                            </li>

                            <li className="w-full flex items-center py-1 px-4 overflow-hidden hover:bg-[#458ACE] cursor-pointer group">
                                <div className="flex flex-row gap-4 items-center">
                                    <TbReportSearch size={26} className="text-black group-hover:text-white" />
                                    <span className="block font-semibold group-hover:text-white">Transferência</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <footer className="w-full h-full flex items-end justify-start py-3">
                        <li className="w-full flex items-center py-1 px-4 overflow-hidden hover:bg-[#458ACE] cursor-pointer group">
                            <Link className="text-black flex flex-row items-center gap-4" to="/home">
                                <RxExit size={26} className="text-black group-hover:text-white" />
                                <span className="block font-semibold group-hover:text-white">Sair</span>
                            </Link>
                        </li>
                    </footer>
                </div>
            </aside>
        </>
    )
}