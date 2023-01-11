import CreateSafe from "./CreateSafe";
import { IOwner } from "../../types/types";
import LoadSafe from "./LoadSafe";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  safeAddress: string, 
  setSafeAddress: Dispatch<SetStateAction<string>>,
  loadSafe: () => Promise<void>,
  createSafe: (newOwners: IOwner[], newThreshold: number) => Promise<void>
}

export default function ManageSafe({ safeAddress, setSafeAddress, loadSafe, createSafe }: IProps) {
  return (
    <>
      <LoadSafe safeAddress={safeAddress} setSafeAddress={setSafeAddress} loadSafe={loadSafe} />
      <div>OR</div>
      <CreateSafe createSafe={createSafe}/>
    </>
  )
}