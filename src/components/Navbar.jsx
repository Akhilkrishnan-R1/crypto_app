import React from 'react'
import { CryptoState } from '../Context/GlobalContext'



const Navbar = () => {

  const {currency, setCurrency} = CryptoState()
  console.log(currency)

  return (
   <div className='p-3 flex justify-between h-auto'>
    <div>
      <h2 className='text-orange-500 font-semibold md:text-3xl text-xl cursor-pointer'>
        CRYPTO TRACKER
      </h2>
    </div>
    <div>
      <select onChange={(e) => setCurrency(e.target.value)} className='border-solid border-white text-yellow-50 text-xl'>
        <option value="inr">INR</option>
        <option value="usd">USD</option>
      </select>
    </div>
   </div>
  )
}

export default Navbar