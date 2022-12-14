import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Context/GlobalContext'
import { useParams } from 'react-router-dom'
import Chart from '../components/Chart';
import { numberWithCommas } from './Homepage';

const CoinPage = () => {

    const { currency, symbol } = CryptoState()
    const { id } = useParams();
    const [singleCoin, setSingleCoin] = useState([])
    const [loading, setLoading] = useState(true)

    const [chartData, setChartData] = useState([])
    const { days, setDays } = CryptoState()
    

    useEffect(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`).then((res) => {
        setChartData(res.data.prices)
      })
        
    }, [id,days,currency])

    const singleCoinApi = `https://api.coingecko.com/api/v3/coins/${id}`

    const fetchSingleCoin = async () => {
      await axios.get(singleCoinApi)
      .then((res) => setSingleCoin(res.data) )
      setLoading(false)
    }

    useEffect(() => {
      fetchSingleCoin()
    }, [id, currency])

    
    
    
  return (
    <div>
      {loading ? (
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
        <>
          <div>
            <div className='flex align-middle items-center flex-col text-center mt-10 '>
              <img className='w-40' src={singleCoin.image.large} alt="" />
              <h1 className='text-white text-6xl font-bold mt-9' >{singleCoin.name}</h1>
              <h4 className='text-white ml-3 mr-3 mt-3 lg:ml-32 lg:mr-32'>
                <div dangerouslySetInnerHTML={{ __html: singleCoin?.description.en.split(". ")[0]}}/>
              </h4>
            </div>
            <div className='flex justify-center'>
              <span className='text-white text-3xl font-semibold mt-3' >Rank:</span>
              &nbsp;
              <span className='text-white text-3xl  mt-3'>{singleCoin?.coingecko_rank}</span>
            </div>
            <div className='flex justify-center'>
              <span className='text-white text-3xl font-semibold mt-3' >Price:</span>
              &nbsp; &nbsp;
              <span className='text-white text-3xl font-semibold mt-3'>{symbol}</span>
              &nbsp;
              <span className='text-white text-3xl  mt-3'>{singleCoin?.market_data.current_price[currency]}</span>
            </div>
            <div className='flex justify-center'>
              <span className='text-white text-3xl font-semibold mt-3' >Market Cap:</span>
              &nbsp; &nbsp;
              <span className='text-white text-3xl font-semibold mt-3'>{symbol}</span>
              &nbsp;
              <span className='text-white text-3xl  mt-3'>
              {numberWithCommas(
                singleCoin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M</span>
            </div>

          </div>
        </>
      )}
      <div className=''>
        <Chart chartData={chartData} />
      </div>
      <div className='flex align-middle justify-center'>
        <button onClick={() => setDays(1)} className='bg-orange-500 w-auto mx-2 px-2 py-1 rounded-md focus:bg-black focus:border-orange-500 focus:border-2 focus:text-orange-500'>1 day</button>
        <button onClick={() => setDays(30)} className='bg-orange-500 w-auto mx-2 px-2 py-1 rounded-md focus:bg-black focus:border-orange-500 focus:border-2 focus:text-orange-500'>30 days</button>
        <button onClick={() => setDays(365)} className='bg-orange-500 w-auto mx-2 px-2 py-1 rounded-md focus:bg-black focus:border-orange-500 focus:border-2 focus:text-orange-500'>365 days</button>
      </div>
    </div>
  )
}

export default CoinPage