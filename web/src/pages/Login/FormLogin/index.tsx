import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

const schema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(255, "O nome deve ter no máximo 255 caracteres"),
    email: z.string().email("Email inválido").max(255, "O email deve ter no máximo 255 caracteres"),
    cpf: z.string().min(3, "O cpf deve ter pelo menos 3 caracteres").max(14, "O CPF deve ter no máximo 14 caracteres"),
    password: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres").max(255, "A cidade deve ter no máximo 255 caracteres"),
    cep: z.string().min(9, "O cep deve ter pelo menos 3 caracteres").max(9, "O CEP deve ter no máximo 9 caracteres"),
    dateNasc: z.string().refine((val) => {
        return isValid(parseISO(val));
    }, 'Data de nascimento inválida'),
});

type InputsProps = {
    nameSpan: string;
    classNameGrid: string;
    placeholder: string;
    name: string;
    type: string;
    mask?: string;
};

type SchemaType = z.infer<typeof schema>

type FormLoginProps = {
    handleTogglePages: () => void
}

export function FormLogin({ handleTogglePages }: FormLoginProps){
    const { register, handleSubmit, formState: { errors }, } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    });

    const inputs: InputsProps[] = [
        {
            nameSpan: "Nome",
            classNameGrid: "items-start",
            name: "nome",
            placeholder: "Digite seu nome",
            type: "text",
        },
        {
            nameSpan: "Email",
            classNameGrid: "items-end",
            name: "email",
            placeholder: "Digite seu email",
            type: "email",
        },
        {
            nameSpan: "CPF",
            classNameGrid: "items-start",
            name: "cpf",
            placeholder: "Digite seu CPF",
            mask: "999.999.999-99",
            type: "text",
        },
        {
            nameSpan: "Cep",
            classNameGrid: "items-end",
            name: "cep",
            placeholder: "Digite seu cep",
            type: "text"
        },
        {
            nameSpan: "Senha",
            classNameGrid: "items-start",
            name: "password",
            placeholder: "Digite sua senha",
            type: "password",
        }
    ];

    return(
        <>
            <div className="grid gap-1">
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-3xl font-bold">Login</h1>
                </div>

                <span className="font-semibold opacity-60">Faça Login</span>
            </div>
            <form className="h-full w-full grid grid-cols-inputs-register pt-4" onSubmit={handleSubmit(submit)}>
                {inputs.map((input: InputsProps, index: Key) => (
                    <div className={`flex flex-col gap-1 ${input.classNameGrid} justify-start text-black`} key={index}>
                        <div className="w-4/5 text-start">
                            <span className="font-bold">{input.nameSpan}</span>
                        </div>

                        <div className="w-4/5 border-2 border-[#00938c] rounded-lg py-1 2xl:py-2 px-3">
                            {input.mask ? (
                                <InputMask
                                    mask={input.mask}
                                    maskPlaceholder=""
                                    {...register(input.name)}
                                    placeholder={input.placeholder}
                                    className="text-sm 2xl:text-base w-full h-full outline-none border-none"
                                />
                            ) : (
                                <input
                                    type={input.type}
                                    {...register(input.name)}
                                    placeholder={input.placeholder}
                                    className="text-sm 2xl:text-base w-full h-full outline-none border-none"
                                />
                            )}
                        </div>
                        
                        <div className={`w-4/5 flex ${input.classNameGrid} justify-start`}>
                            {errors[input.name] && <span className="text-red-600">{errors[input.name].message}</span>}
                        </div>
                    </div>
                ))}

                <div className="flex flex-col gap-1 items-end">
                    <div className="w-4/5 text-start">
                        <span className="font-bold text-black">Data de Nascimento</span>
                    </div>
                    <div className="w-4/5 border-2 border-[#00938c] rounded-lg py-1 2xl:py-2 px-3">
                        <input
                            type="date"
                            placeholder="Digite a data de nascimento"
                            className="text-sm 2xl:text-base w-full h-full outline-none border-none text-black"
                            { ...register("dateNasc", { required: true }) }
                        />
                    </div>
                    
                    {errors.dateNasc && <span className="text-red-600">{errors.dateNasc.message}</span>}
                </div>

                <div className="w-full h-auto flex flex-col items-end justify-center col-span-2 gap-1">
                    <button type="submit" className="w-full border border-[#00938c] text-[#00938c] py-2 px-6 rounded-lg hover:bg-[#00938c] hover:text-white transition-all">
                        Cadastrar-se
                    </button>

                    <p>Não tem conta? 
                        <span className="cursor-pointer font-bold text-blue-600 hover:text-blue-800" onClick={() => handleTogglePages()}> Clique aqui</span>
                    </p>
                </div>
            </form>
        </>
    );

    function submit(e: SchemaType){
        console.log(e);
    }
}