import React, { useState } from 'react';
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers";
import { sendETH } from '../../services/send';

const INITIAL_STATE = {to: "", amount: "0"}

export default function Send() {
  const { library } = useWeb3React()
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setForm({
        ...form,
        [e.currentTarget.name]: e.currentTarget.value,
      })
    } catch (error: any) {
      window.alert(error.message)
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    try {
      e.preventDefault()
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  const handleSend = async () => {
    try {
      if (!ethers.utils.isAddress(form.to)) {
        window.alert("Invalid Address")
        return
      }
      const amount = parseFloat(form.amount)
      if (isNaN(amount) || amount <= 0) {
        window.alert("Invalid Amount")
        return
      }

      if (!library) {
        window.alert("Please Connect Wallet First")
        return
      }

      await sendETH(form.to, form.amount, library)
      setForm(INITIAL_STATE)
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  return (
        <div className='box  big-box bg-general'>
          <h2>SEND ETH</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="to">To </label>
                <input
                    type="text"
                    id="to"
                    name="to"
                    placeholder='Enter Destination Address'
                    value={form.to}
                    size={50}
                    onChange={handleChange}
                />
              <br />
              <label htmlFor="amount">Amount (ETH) </label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    pattern="[0-9.]+"
                    value={form.amount}
                    onChange={handleChange}
                />
              <br />
              <button onClick={handleSend}>Send</button>                
            </form>        
        </div>
    )
}
