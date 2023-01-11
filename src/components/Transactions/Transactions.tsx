import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { getTransactions } from "../../services/transactions";
import { ITransaction } from "../../types/types";
import Transaction from "./Transaction";

export default function Transactions() {
  const { account } = useWeb3React()
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const handleClick = async () => {
    try {
      if (!account){
        window.alert("Please Connect Wallet First")
        return 
      }
      const userTransactions = await getTransactions(account)
      if (userTransactions)
        setTransactions(userTransactions)
      } catch (error: any) {
        window.alert(error.message)
      }
    }
  
  return (
    <div className='box big-box bg-general'>
        <h2>TRANSACTIONS</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Tx Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length>0 && transactions.map((transaction: ITransaction) => <Transaction key={transaction.hash} transaction={transaction}/>)}        
            </tbody>
          </table>
        </div>
        <br />
        <button onClick={handleClick}>Get Transactions</button>
    </div>
    
  )
}