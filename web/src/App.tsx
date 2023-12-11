import { useContext } from "react";
import { Header } from "./components/Header";
import { StoreContext } from "./context";

export function App() {
  const useStore = useContext(StoreContext);
  const { user } = useStore();
  const peoples = [
    "/public/people(1).jpg", 
    "/public/people(2).jpg",
    "/public/people(3).jpg",
    "/public/people(4).jpg"
  ];

  console.log(user);

  return (
    <>
      <Header />

      <main className="w-screen h-screen bg-home grid grid-cols-2 main-home">
        <section className="w-4/5 h-4/5 mb-auto mx-auto flex flex-col items-center justify-between text-white relative">
          <div className=""></div>

          <div className="flex flex-col gap-2 items-center justify-center text-black">
            <h1 className="text-6xl font-bold">Um site, tudo <span className="text-[#00938c]">relacionado</span> a <span className="text-[#00938c]">dinheiro</span> 
            </h1>
            <p className="font-semibold opacity-60">
              Desde fácil gerenciamento de dinheiro até vantagens em viagens e investimentos. Abra sua conta 
              rapidamente
            </p>
          </div>

          <div className="w-full h-auto flex items-center justify-end absolute top-[72%]">
            {peoples.map((people: string, index: number) => (
              <div className="w-12 h-12 rounded-full relative">
                <img src={people} alt="" className={`w-full h-full rounded-full object-cover absolute inset-y-0`} style={{ right: `${index * 16}px` }} />
              </div>
            ))}

            <div className="w-16 h-12 flex items-center justify-center rounded-full bg-blue-500 absolute right-0">
              <span className="font-bold">10K</span>
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-between text-black">
            <div className="w-[33%] h-auto flex flex-col items-start gap-1">
              <h2 className="text-3xl font-bold">10+ mil</h2>
              <h2 className="text-base font-semibold">Usuários Cadastrados</h2>
            </div>

            <div className="w-[33%] h-auto flex flex-col items-start gap-1">
              <h2 className="text-3xl font-bold">5+ mil</h2>
              <h2 className="text-base font-semibold">Empresas Cadastradas</h2>
            </div>

            <div className="w-[33%] h-auto flex flex-col items-start gap-1">
              <h2 className="text-3xl font-bold">20+ mil</h2>
              <h2 className="text-base font-semibold">Transações Concluidas</h2>
            </div>
          </div>
        </section>

        <aside className="w-full h-full flex items-center justify-center">
          <img src="/public/cards.png" alt="" className="w-full h-4/6 fill-white" />
        </aside>
      </main>
    </>
  )
}
