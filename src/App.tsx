import './App.css'
import Send from './components/Send/Send'
import Transactions from './components/Transactions/Transactions'
import Wallet from './components/Wallet/Wallet'

function App() {
  
  return (
    <div className='grid'>
      <Wallet />
      <Send />
      <Transactions />
    </div>
  )
}

export default App
