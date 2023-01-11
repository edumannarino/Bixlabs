import { useState } from "react"
import { IOwner } from "../../types/types"

interface IProps {
  owner: IOwner,
  removeOwner: (ownerAddress: string) => Promise<void>, 
  changeNickname: (owner: IOwner) => void
}

export default function Owner({ owner, removeOwner, changeNickname }: IProps) {
  const [nickname, setNickname] = useState<string>(owner.nickname ?? '')

  return (
    <>
    <div className="box bg-owners">
      <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
        <label htmlFor={`input-new-owner-nickname`}>Nickname </label>
          <input               
            type="text"
            size={30}
            id={'input-new-owner-nickname'}
            placeholder='Enter New Owner Nickname'
            value={nickname}
            onChange={(event) => setNickname(event.currentTarget.value)} />
          <button onClick={() => changeNickname({address: owner.address, nickname})}>Change</button>    
        </form>
      {`Address ${owner.address}`}
      <br />
      <button onClick={() => removeOwner(owner.address)}>Remove Owner</button>
    </div>
    </>
  )
}