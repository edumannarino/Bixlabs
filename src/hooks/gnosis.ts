import Safe from "@safe-global/safe-core-sdk"
import EthersAdapter from '@safe-global/safe-ethers-lib'
import { SafeTransaction } from '@safe-global/safe-core-sdk-types';
import SafeServiceClient, { ProposeTransactionProps } from '@safe-global/safe-service-client'
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

export const useGnosis = () => {

  const { account, library } = useWeb3React()
  const getEthAdapter = () => {
    try {
      const provider = library?.getSigner() ?? new ethers.providers.Web3Provider(window.ethereum);
      return new EthersAdapter({ethers, signerOrProvider: provider })
    } catch (error: any) {
      throw error
    }
  }  

  const checkOwner = async (safe: Safe) => {
    try {
      if (!safe || !library) {
        window.alert("Please Connect Wallet First")
        return false
      }
      const isOwner = await safe.isOwner(account!)
      if (!isOwner) {
        window.alert("Not an owner")
        return false     
      }
      return true
    } catch (error: any) {
      throw error
    }
  }  
  
  const proposeTx = async (safe: Safe, safeTransaction: SafeTransaction) => {
    try {
      const txServiceUrl = process.env.REACT_APP_SERVICE_URL 
      if (!txServiceUrl) {
        window.alert("Service URL is not configured")
        return false
      }
      const safeTxHash = await safe!.getTransactionHash(safeTransaction)
      const ownerSignature = await safe!.signTransactionHash(safeTxHash)
      const transactionConfig: ProposeTransactionProps = {
        safeAddress: safe.getAddress(),
        safeTxHash,
        safeTransactionData: safeTransaction.data,
        senderAddress: account!,
        senderSignature: ownerSignature.data,
        origin
      }
      const ethAdapter = getEthAdapter()
      const safeService = new SafeServiceClient({
        txServiceUrl,
        ethAdapter
      })
      await safeService.proposeTransaction(transactionConfig)
      return true
    } catch (error: any) {
      throw error
    }
  }

  return { checkOwner, getEthAdapter, proposeTx }
}


