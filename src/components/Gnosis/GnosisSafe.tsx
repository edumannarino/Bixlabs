import { useState } from 'react'
import Safe, { AddOwnerTxParams, RemoveOwnerTxParams, SafeAccountConfig, SafeFactory } from '@safe-global/safe-core-sdk'
import { useGnosis } from '../../hooks/gnosis'
import { ethers } from 'ethers'
import { IOwner } from '../../types/types';
import ManageSafe from './ManageSafe'
import Owners from './Owners'
import Spinner from '../../components/Spinner/Spinner';
import Threshold from './Threshold';

export default function GnosisSafe() {
  const [safeAddress, setSafeAddress] = useState<string>("")
  const [owners, setOwners] = useState<IOwner[]>([])
  const [threshold, setThreshold] = useState<number>(0)
  const [safe, setSafe] = useState<Safe | undefined>()
  const [loadingSafe, setLoadingSafe] = useState<boolean>(false)
  const [creatingSafe, setCreationSafe] = useState<boolean>(false)

  const { checkOwner, getEthAdapter, proposeTx} = useGnosis()

  const setOwnersNickname = (currentOwners: string[], safeAddress: string) => {
    try {
      const newOwners = currentOwners.map((owner) => {
        const key = safeAddress.concat(owner).toLowerCase()
        const nickname = localStorage.getItem(key) ?? ''
        const newOwner: IOwner = {address: owner, nickname}
        return newOwner
      })
      return newOwners
    } catch (error: any) {
      throw error
    }
  }

  const getSafeData = async (safeSdk: Safe) => {
    try {
      const currentOwners = await safeSdk.getOwners()
      const newOwners = setOwnersNickname(currentOwners, safeSdk.getAddress())
      setOwners(newOwners)
      setThreshold(await safeSdk.getThreshold())    
    } catch (error: any) {
      throw error
    }
  }

  const loadSafe = async () => {
    try {

      if (!ethers.utils.isAddress(safeAddress)){
        window.alert("Please Enter a Valid Address")
        return
      }

      setLoadingSafe(true)
      const ethAdapter = getEthAdapter()
      const safeSdk = await Safe.create({ ethAdapter, safeAddress })
      setSafe(safeSdk)
      getSafeData(safeSdk)
    } catch (error: any) {
      window.alert(error.message)
    } finally {
      setLoadingSafe(false)
    }
  }

  const removeOwner = async (ownerAddress: string) => {
    try {

      if (! safe)
        return
      const ownerCheck = await checkOwner(safe)
      if (!ownerCheck)
        return
      
      const params: RemoveOwnerTxParams = { ownerAddress }
      const safeTransaction = await safe!.createRemoveOwnerTx(params)
      const success = await proposeTx(safe, safeTransaction)
      if (!success)
        return
      
      window.alert("remove Owner Tx Proposed")
    } catch (error: any) {
      window.alert(error.message)
    }
  }
  
  const addOwner = async (newOwner: IOwner) => {
    try {

      if (! safe)
        return
      const ownerCheck = await checkOwner(safe)
      if (!ownerCheck)
        return
      
      const params: AddOwnerTxParams = { ownerAddress: newOwner.address }
      const safeTransaction = await safe!.createAddOwnerTx(params)
      const success = await proposeTx(safe, safeTransaction)
      if (!success)
        return
      
      const key = safeAddress.concat(newOwner.address).toLowerCase()
      localStorage.setItem(key, newOwner.nickname ?? '')
      window.alert("Add Owner Tx Proposed")
    } catch (error: any) {
      window.alert(error.message)
    }

  }
    
  const changeThreshold = async (newThreshold: number) => {
    try {
      if (! safe)
        return
      const ownerCheck = await checkOwner(safe)
      if (!ownerCheck)
        return

      
      const safeTransaction = await safe!.createChangeThresholdTx(newThreshold)
      const success = await proposeTx(safe, safeTransaction)
      if (!success)
      return
      window.alert("Change Threshold Tx Proposed")
    } catch (error: any) {
      window.alert(error.message)
    }

  }

  const changeNickname = (owner: IOwner) => {
    try {
      const key = safeAddress.concat(owner.address).toLowerCase()
      localStorage.setItem(key, owner.nickname ?? '')
      window.alert("Nickname Changed")
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  const changeSafe = () => {
    setSafe(undefined)
    setOwners([])
    setThreshold(0)
  }

  const createSafe = async (newOwners: IOwner[], newThreshold: number) => {
    try {

      if (newOwners.length < 1) {
        window.alert("Owners must be at least one.")
        return
      }
      
      if (newThreshold < 1) {
        window.alert("Thresold must be at least one.")
        return
      }
      
      if (newThreshold > newOwners.length) {
        window.alert("Thresold must be less than owners.")
        return
      }
      
      for (const owner of newOwners) {
        if (!ethers.utils.isAddress(owner.address)){
          window.alert(`Address ${owner.address} is not valid`)
          return
        }
      }
      
      const ethAdapter = getEthAdapter()
      if (!ethAdapter.getSigner()) {
        window.alert("Please Connect Wallet First")
        return
      }

      setCreationSafe(true)    
      const safeFactory = await SafeFactory.create({ ethAdapter })
      
      const owners = newOwners.map((newOwner) => newOwner.address)
      const safeAccountConfig: SafeAccountConfig = {
        owners,
        threshold: newThreshold
      }
      
      const newSafe = await safeFactory.deploySafe({ safeAccountConfig }) 
      setSafe(newSafe)
      const newSafeAddress = newSafe.getAddress()
      setSafeAddress(newSafeAddress)
      
      newOwners.forEach((owner: IOwner) => {
        const key = newSafeAddress.concat(owner.address).toLowerCase()
        localStorage.setItem(key, owner.nickname ?? '')
      })

      getSafeData(newSafe)
      
    } catch (error: any) {
      window.alert(error.message)
    } finally {
      setCreationSafe(false)
    }
  }

  if (loadingSafe || creatingSafe)
    return (
      <div className='box big-box bg-general'>
        <h2>GNOSIS SAFE</h2>
        <div>{loadingSafe ? 'LOADING' : 'CREATING' } SAFE...</div>
        <br />
        <Spinner />
      </div>
    )

  return (
  <>
    <div className='box big-box bg-general'>
      <h2>GNOSIS SAFE</h2>
      {!safe && <ManageSafe safeAddress={safeAddress} setSafeAddress={setSafeAddress} loadSafe={loadSafe} createSafe={createSafe}/>}
      {safe && <button onClick={changeSafe}>← Load/Create Safe</button> }
      {safe && <h4>{`SAFE ADDRESS: ${safeAddress}`}</h4>  }
      {owners.length>0 && <Owners owners={owners} removeOwner={removeOwner} addOwner={addOwner} changeNickname={changeNickname}/> }
      {threshold>0 && <Threshold threshold={threshold} changeThreshold={changeThreshold}/>}

    </div>
  </>
)
}