type AllDepositsType = {
    authorization_code: string,
    value: number,
    date: string
}

type TableDepositProps = {
    allDeposits: AllDepositsType[],
}

export function TableDeposit({ allDeposits }: TableDepositProps){
    return(
        <>
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2">Código de Autorização</th>
                    <th className="px-4 py-2">Valor Depositado</th>
                    <th className="px-4 py-2">Data do Depósito</th>
                </tr>
            </thead>

            <tbody>
                {allDeposits && allDeposits.map((data: AllDepositsType, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2">{data.authorization_code}</td>
                        <td className="px-4 py-2">{data.value}</td>
                        <td className="px-4 py-2">{data.date}</td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}