import { ethers } from "ethers"
import { Web3Provider } from "@ethersproject/providers";

export const sendETH = async (to: string, amount: string, library: Web3Provider) => {
  try {
    const signer = library.getSigner()
    const transactionRequest = {to, value: ethers.utils.parseEther(amount)}
    await signer.sendTransaction(transactionRequest)
  } catch (error: any) {
    window.alert(error.message)
  }
}