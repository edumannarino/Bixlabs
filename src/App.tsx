import './App.css'
import Wallet from './components/Wallet/Wallet'
import Send from './components/Send/Send'
import Transactions from './components/Transactions/Transactions'
import GnosisSafe from './components/Gnosis/GnosisSafe'

function App() {
  
  return (
    <div className='grid'>
      <Wallet />
      <Send />
      <GnosisSafe />
      <Transactions />
    </div>
  )
}

export default App
