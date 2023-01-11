import { useState } from "react";
import Owner from "./Owner";
import { IOwner } from "../../types/types"

interface IProps {
  owners: IOwner[],
  removeOwner: (ownerAddress: string) => Promise<void>, 
  addOwner: (newOwner: IOwner) => Promise<void>,
  changeNickname: (owner: IOwner) => void
}

export default function Owners({ owners, removeOwner, addOwner, changeNickname }: IProps) {
  const [newOwner, setNewOwner] = useState<IOwner>({address: "", nickname: ""})

  return (
    <>
    <div className='box '>
      <div className='box bg-items'>
        <h3>Owners</h3>
        {owners.map((owner: IOwner) => <Owner key={owner.address} owner={owner} removeOwner={removeOwner} changeNickname={changeNickname} />) }
      </div>
      <br />
      <div className='box bg-items'>
        <h3>Add Owners</h3>
        <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
          <label htmlFor={`input-new-owner-address`}>Address </label>
          <input               
            type="text"
            size={50}
            id={'input-new-owner-address'}
            placeholder='Enter New Owner Address'
            value={newOwner.address}
            onChange={(event) => setNewOwner({...newOwner, address: event.currentTarget.value})} />
          <br />
          <label htmlFor={`input-new-owner-nickname`}>Nickname </label>
          <input               
            type="text"
            size={50}
            id={'input-new-owner-nickname'}
            placeholder='Enter New Owner Nickname'
            value={newOwner.nickname}
            onChange={(event) => setNewOwner({...newOwner, nickname: event.currentTarget.value})} />
          <br />
          <button onClick={() => addOwner(newOwner)}>Add</button>    
        </form>
      </div>
     </div>
    </>
  )
}