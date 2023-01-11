import { ITransaction } from "../../types/types";

interface IProps {
  transaction: ITransaction
}

export default function Transaction({ transaction }: IProps) {
    return (
        <>
            <tr>
              <td className="table-cell">
                <a href={`https://goerli.etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer"> 
                  {transaction.hash}
                </a>
              </td>
            </tr>
        </>
    )
}