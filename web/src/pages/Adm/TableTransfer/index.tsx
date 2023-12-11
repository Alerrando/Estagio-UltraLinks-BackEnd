type AllTransferType = {
    authorization_code: string,
    value: number,
    user_cpf_transfer: string,
    date: string
}

type TableTransferProps = {
    allTransfer: AllTransferType[],
}

export function TableTransfer({ allTransfer }: TableTransferProps){
    return(
        <>
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2">Cpf da pessoa transferida</th>
                    <th className="px-4 py-2">Código de Autorização</th>
                    <th className="px-4 py-2">Valor Depositado</th>
                    <th className="px-4 py-2">Data do Depósito</th>
                </tr>
            </thead>

            <tbody>
                {allTransfer && allTransfer.map((data: AllTransferType, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2">{data.user_cpf_transfer}</td>
                        <td className="px-4 py-2">{data.authorization_code}</td>
                        <td className="px-4 py-2">{data.value}</td>
                        <td className="px-4 py-2">{data.date}</td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}