import React from 'react'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../Context/GlobalContext';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
 
  
};





const Chart = ({chartData}) => {

  const { days, currency } = CryptoState()

  const data = {
    labels: chartData?.map(item => {
      let date = new Date(item[0])
      let time = date.getHours() > 12
      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
      : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time: date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `price in ${currency}`,
        data: chartData?.map((coin) => coin[1]),
        borderColor: 'rgb(249, 115, 22 )',
      },
    ],
  }


  return (
    <div>
      {!chartData ? (
        <div className='flex align-middle justify-center mt-10'>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-yellow-300 animate-spin">
            <div className="h-11 w-11 rounded-full bg-black">
  
            </div>
          </div>
        </div>
      ) : (
        <div className=' py-6 md:px-36 md:py-10  '>
          <Line options={options} data={data} />;
        </div>
      )}
      
    </div>
  )
}

export default Chart