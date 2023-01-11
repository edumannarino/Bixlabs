import { Dispatch, SetStateAction } from "react"

interface IProps {
  safeAddress: string, 
  setSafeAddress: Dispatch<SetStateAction<string>>,
  loadSafe: () => Promise<void>
}

export default function LoadSafe({ safeAddress, setSafeAddress, loadSafe }: IProps) {
  return (
    <div className="box medium-box bg-items">
      <h3>LOAD SAFE</h3>
      <form onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
        <label htmlFor={`input-safe-address`}>Safe Address </label>
        <input               
          type="text"
          size={50}
          id={'safe-address'}
          placeholder='Enter Safe Address'
          value={safeAddress}
          onChange={(event) => setSafeAddress(event.currentTarget.value)} />
          <button onClick={loadSafe}>Load Safe</button>
      </form>
    </div>
  )
}