import { useState } from "react"
import { IOwner } from "../../types/types"


interface IProps {
  createSafe: (newOwners: IOwner[], newThreshold: number) => Promise<void>
}

export default function CreateSafe({ createSafe }: IProps) {
  const [owners, setOwners] = useState<IOwner[]>([{address: "", nickname: ""}])
  const [threshold, setThreshold] = useState<number>(0)

  const handleChange = (e: React.FormEvent<HTMLInputElement>, index: number, field: "address" | "nickname") => {
    try {
      const newOwners = [...owners]
      newOwners[index][field] = e.currentTarget.value
      setOwners(newOwners)
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  const handleAdd = () => {
    try {
      setOwners([...owners, {address: "", nickname: ""}])
    } catch (error: any) {
      window.alert(error.message)
    }
}

  const handleRemove = (index: number) => {
    try {
      if (owners.length <= 1)
        return
      const newOwners = [...owners]
      newOwners.splice(index, 1)
      setOwners(newOwners)
    } catch (error: any) {
      window.alert(error.message)
    }
  };

  return (
    <>
      <div className='box medium-box bg-items'>
        <h3>CREATE SAFE</h3>
        <div className='box'>
          <h3>Owners</h3>
          <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
            {owners.map((owner: IOwner, index: number) => {
              return (
                <div className="box bg-owners" key={index}>
                    <label htmlFor={`input-new-owner-address`}>Address </label>
                    <input               
                      type="text"
                      size={50}
                      id={'input-new-owner-address'}
                      placeholder='Enter New Owner Address'
                      value={owner.address}
                      onChange={(event) => handleChange(event, index, "address")} />
                    <br />
                    <label htmlFor={`input-new-owner-nickname`}>Nickname </label>
                    <input               
                      type="text"
                      size={50}
                      id={'input-new-owner-nickname'}
                      placeholder='Enter New Owner Nickname'
                      value={owner.nickname}
                      onChange={(event) => handleChange(event, index, "nickname")} />
                      <br />
                    <button onClick={() => handleRemove(index)}>Remove Owner</button>    
                </div>

              )
              
            })}
            <button onClick={handleAdd}>Add Owner</button>    
          </form>
        </div>
        <div className='box'>
          <h3>Threshold</h3>
          <div>
            <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
              <label htmlFor={`input-new-threshold`}>Threshold </label>
              <input               
                type="text"
                size={10}
                id={'input-new-threshold'}
                value={threshold}
                onChange={(event) => setThreshold(parseInt(event.currentTarget.value))} />
            </form>
          </div>
        </div>
        <button onClick={() => createSafe(owners, threshold)}>Create Safe</button>    
      </div>
    </>
  )
}