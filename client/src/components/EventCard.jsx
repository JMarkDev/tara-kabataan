import React from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { useFormat } from '../hooks/useFormatDate'

const EventCard = ({ event }) => {
  const { dateFormat, formatTime, extractYear } = useFormat()

  return (
    <div className="lg:px-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        {event.map(({ id, event_title, event_category, image, start_date, end_date, start_time, end_time, price, discount, event_type}) => (
          <div key={id} className=" bg-white cursor-pointer rounded-md shadow-md hover:shadow-2xl">
        <div className='relative'>
          <p className={`${discount !== "0.00" ? "block" : "hidden"} bg-[#ffe97a] rounded-bl-lg text-[#ec3814] py-2 px-2  shadow-md absolute right-0`}>
            {((price - discount) / price * 100 - 100).toFixed(2)}%
          </p>
        </div>

            <img src={`${api.defaults.baseURL}${image}`} alt={event_title} className="w-full h-[250px] object-cover rounded-md" />
            <div className='p-3'>
              <p className='bg-[#f6f6f6] text-[#6415ff] text-md px-5 w-fit rounded-full'>{event_category}</p>
              <h1 className="text-[#243e63] text-xl font-bold mt-3">{event_title}</h1>
              <p className='text-[15px]'><span className='font-semibold text-[#243e63] text-sm'>Date: </span>{extractYear(start_date)} - {dateFormat(end_date)}</p>
              <p className='text-[15px]'><span className='font-semibold text-[#243e63] text-sm'>Time: </span>{formatTime(start_time)} - {formatTime(end_time)}</p>
              <div className='flex justify-between items-center'>
              { event_type === 'Free'? <p className='text-lg py-2'>Free</p> : (
                <div className='py-2 flex items-center justify-between gap-5 text-lg'>
                  <div className='flex gap-5'>
                    <p className={`${discount !== "0.00" ? 'line-through text-gray-600' : ''}`}>₱ {price}</p>
                    <p className={`text-black ${discount === "0.00" ? 'hidden' : ''}`}>₱{price - discount}</p>
                  </div>
                </div>
                )}
                <Link className='bg-[#854ef3] rounded-lg px-5 py-3 text-sm text-white'>
                      View Details
                </Link>
                </div>
              </div>
              
          </div>
        ))}
      </div>
  )
}

export default EventCard