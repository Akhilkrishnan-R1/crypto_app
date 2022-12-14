import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Context/GlobalContext';

import { useNavigate } from 'react-router-dom'

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Homepage = () => {
  
  const { currency } = CryptoState()
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const coinApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  const fetchApi = async () => {
    await axios.get(coinApi).then(res => setCoins(res.data))
    setLoading(false)
  }

  useEffect(() => {
   fetchApi()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency])

  
  const handleNavigate = (url) => {
    navigate(url)
  }

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
 
  

  return (
  <>
  <div className='justify-center flex'>
    <input type="text" placeholder='Search Coins...' onChange={(e) => setSearch(e.target.value)} className='border-yellow-100 border-2 pl-2 rounded-md w-[80%] justify-self-center text-white'  />
  </div>
  <div className='flex justify-center'>
    {loading? (
      <div className="border border-blue-300 shadow rounded-md p-4 w-[90%] mx-auto mt-5">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <table className='table-auto shadow-2xl border-2 border-orange-500 w-[90%] mt-5 ' >
      <thead className=' text-white rounded-md'>
        <tr>
          <th className='py-3 bg-orange-400'>Coin</th>
          <th className=' bg-orange-400'>Price</th>
          <th className='bg-orange-400'>24h Change</th>
          <th className='py-3 bg-orange-400'>Market Cap</th>
        </tr>
      </thead>
      <tbody className='p-2'>
        {handleSearch().map((item, index) => {
          const profit = item.price_change_percentage_24h
          return (
            <tr onClick={() => handleNavigate(`/coin/${item.id}`)} key={index} className='text-white border-b-[.002px] '>
              <td className='p-2'>
                <div className='flex '>
                <img className='w-10' src={item?.image} alt="" />
                
                </div>
                <p className='uppercase ml-2'>{item?.symbol}</p>
                <p className='ml-2 mt-2'>{item?.name}</p>
                </td>
                <td>
                  <p className='text-white'>{currency === 'inr' ?(
                  `₹${numberWithCommas(item?.current_price)}`
                ) : (
                  `$${numberWithCommas(item?.current_price)}`
                )}</p>
                </td>
                <td>
                  <p className={`${ profit < 0 ? 'text-red-600' : 'text-green-600' }`}>
                    {profit > 0 && '+'}
                    {item?.price_change_percentage_24h}
                  </p>
                </td>
                <td>
                  <p>
                  {Symbol}{" "}
                          {numberWithCommas(
                            item.market_cap.toString().slice(0, -6)
                          )}
                          M
                  </p>
                </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    )}
    
  </div>
  </>
  )
}

export default Homepage