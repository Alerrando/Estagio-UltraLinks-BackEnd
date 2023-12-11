import { BiPlus } from "react-icons/bi";

type CreateHeaderProps = {
  setModal: (modal: boolean) => void;
  totalRegiter: number;
};

export default function CreateHeaderRegisters(props: CreateHeaderProps) {
  const { setModal, totalRegiter } = props;

  return (
    <div className="w-full h-auto border border-[#DDD] rounded-lg">
      <header className="flex items-center justify-between px-2 sm:px-5 py-4">
        <div
          className="flex flex-row items-center gap-2 py-2 px-2 sm:px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors"
          onClick={() => setModal(true)}
        >
          <BiPlus size={26} className="group-hover:text-white" />
          <span className="hidden sm:block text-lg group-hover:text-white">Cadastro</span>
        </div>
    
        <div className=""></div>

        <div className="flex flex-row items px-4 py-2 bg-[#222831] text-white rounded-lg">
          <span className="hidden sm:block">Total de registros: {totalRegiter}</span>
          <span className="sm:hidden block">Total: {totalRegiter}</span>
        </div>
      </header>
    </div>
  );
}
