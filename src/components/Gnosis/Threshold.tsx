import { useState } from "react"

interface IProps {
  threshold: number,
  changeThreshold: (newThreshold: number) => Promise<void>
}

export default function Threshold({ threshold, changeThreshold }: IProps) {
  const [newThreshold, setNewThreshold] = useState<number>(0)

  return (
    <>
    <div className='box bg-items'>
      <h3>Threshold</h3>
      {`Current: ${threshold}`}
      <br />
      <div>
        <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
        <label htmlFor={`input-new-threshold`}>New Threshold </label>
        <input               
          type="text"
          size={10}
          id={'input-new-threshold'}
          value={newThreshold}
          onChange={(event) => setNewThreshold(parseInt(event.currentTarget.value))} />
          <button onClick={() => changeThreshold(newThreshold)}>Change</button>    
      </form>
      </div>

    </div>
    </>
  )
}