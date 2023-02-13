import { ITransaction } from "../types/types"

export const getTransactions = async (account: string): Promise<ITransaction[] | undefined> => {
  try {
    const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_URL 
    const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY 

    const response = await fetch(
      ETHERSCAN_URL +
      '?module=account&action=txlist&address=' +
      account +
      '&sort=desc&apikey=' +
      API_KEY
    )

    const data = await response.json() 
    if (typeof data.result === "string") {
      window.alert(data.result)
      return []
    }    
    return data.result
  } catch (error: any) {
    window.alert(error.message)
  }
}
