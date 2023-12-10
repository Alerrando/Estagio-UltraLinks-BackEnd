import { Header } from "./components/Header";

export function App() {

  return (
    <>
      <Header />

      <main className="w-screen h-screen bg-home grid grid-cols-2 main-home">
        <section className="w-4/5 h-4/5 mb-auto mx-auto flex flex-col items-center justify-between text-white">
          <div className=""></div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-6xl font-bold">Um site, tudo relacionado a dinheiro</h1>
            <p className="opacity-60">
              Desde fácil gerenciamento de dinheiro até vantagens em viagens e investimentos. Abra sua conta 
              rapidamente
            </p>
          </div>

          <div className="w-full h-auto flex items-center justify-between">
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
