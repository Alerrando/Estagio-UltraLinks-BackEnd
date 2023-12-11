import { zodResolver } from "@hookform/resolvers/zod";
import { Key, useContext } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { InputsProps } from "../FormLogin";
import { StoreContext, UserProps, UserRegister } from "../../../context";
import { format, isValid, parseISO } from "date-fns";
import { createUser } from "../../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(255, "O nome deve ter no máximo 255 caracteres"),
    email: z.string().email("Email inválido").max(255, "O email deve ter no máximo 255 caracteres"),
    cpf: z.string().min(3, "O cpf deve ter pelo menos 3 caracteres").max(14, "O CPF deve ter no máximo 14 caracteres"),
    password: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres").max(255, "A cidade deve ter no máximo 255 caracteres"),
    cep: z.string().min(9, "O cep deve ter pelo menos 3 caracteres").max(9, "O CEP deve ter no máximo 9 caracteres"),
    date_of_birth: z.string().refine((val) => {
        return isValid(parseISO(val));
    }, 'Data de nascimento inválida'),
    address_number: z.string().min(1, "O nome deve ter pelo menos 3 caracteres").max(255, "O nome deve ter no máximo 255 caracteres"),
});

export type SchemaType = z.infer<typeof schema>

type FormRegisterProps = {
    handleTogglePages: () => void
}

export function FormRegister({ handleTogglePages }: FormRegisterProps){
    const { register, handleSubmit, formState: { errors }, } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    });
    const useStore = useContext(StoreContext);
    const { setUser } = useStore();
    const navigate = useNavigate();

    const inputs: InputsProps[] = [
        {
            nameSpan: "Nome",
            classNameGrid: "items-start",
            name: "name",
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
        },
        {
            nameSpan: "Número da sua casa",
            classNameGrid: "items-end",
            name: "address_number",
            placeholder: "Digite o número da sua casa",
            type: "type",
        },
    ];

    return(
        <>
            <div className="grid gap-1 text-center">
                <h1 className="text-3xl font-bold">Registro</h1>

                <span className="font-semibold opacity-60">Faça seu cadastro aqui!</span>
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

                <div className="flex flex-col gap-1 items-start">
                    <div className="w-4/5 text-start">
                        <span className="font-bold text-black">Data de Nascimento</span>
                    </div>
                    <div className="w-4/5 border-2 border-[#00938c] rounded-lg py-1 2xl:py-2 px-3">
                        <input
                            type="date"
                            placeholder="Digite a data de nascimento"
                            className="text-sm 2xl:text-base w-full h-full outline-none border-none text-black"
                            { ...register("date_of_birth", { required: true }) }
                        />
                    </div>
                    
                    {errors.date_of_birth && <span className="text-red-600">{errors.date_of_birth.message}</span>}
                </div>

                <div className="w-full h-auto flex flex-col items-end justify-center col-span-2 gap-1">
                    <button type="submit" className="w-full border border-[#00938c] text-[#00938c] py-2 px-6 rounded-lg hover:bg-[#00938c] hover:text-white transition-all">
                        Cadastrar-se
                    </button>

                    <p>Já tem conta? 
                        <span className="cursor-pointer font-bold text-blue-600 hover:text-blue-800" onClick={() => handleTogglePages()}> Clique aqui</span>
                    </p>
                </div>
            </form>
        </>
    );

    async function submit(e: SchemaType){
        const { date_of_birth, ...rest } = e;
        const newDateOfBirth = new Date(date_of_birth);
        const register: UserRegister = {
            ...rest,
            date_of_birth: format(newDateOfBirth, "yyyy-MM-dd HH:mm:ss"),
            total_value: parseFloat(0),
        }
    
        const aux = await createUser(register);
        
        if(aux.status){
            const { created, ...restUser } = aux.message.user;
            const user: UserProps = {
                ...restUser,
                token: aux.message.token.original.access_token
            }

            setUser(user);
        }

        toastMessageLogin(aux);

        setTimeout(() => {
            navigate("/adm");
        }, 5000);
    }
    
    function toastMessageLogin(message: { status: boolean, message: [] } | AxiosError) {
        const toastMessage: { status: boolean, message: [] } = {
          message: !(message instanceof AxiosError)
            ? "Cadastro Realizado com sucesso!"
            : message.response?.message,
          status: !(message instanceof AxiosError) ? "success" : "error",
        };
    
        toast[toastMessage.status](toastMessage.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
}