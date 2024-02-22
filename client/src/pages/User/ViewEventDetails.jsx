import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from '../../api/api'
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useFormat } from "../../hooks/useFormatDate";

const ViewEventDetails = () => {
  const { id }  = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [status, setStatus] = useState('');
  const { extractYear, dateFormat, formatTime} = useFormat()
 
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await api.get(`/event/id/${id}`)
        setImage(response.data.image)
        setTitle(response.data.event_title)
        setStartTime(response.data.start_time)
        setEndTime(response.data.end_time)
        setLocation(response.data.location)
        setStartDate(response.data.start_date)
        setEndDate(response.data.end_date)
        setDescription(response.data.event_description)
        setOrganizer(response.data.organizer_name)
        setEventType(response.data.event_type)
        setEventCategory(response.data.event_category)
        setPrice(response.data.price)
        setDiscount(response.data.discount)
        setStatus(response.data.status)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getEventDetails()
  }, [id])
  return (
    <div className="lg:px-20 py-10 flex flex-col gap-5">
      {/* <h1>Event Details</h1> */}
      <img src={`${api.defaults.baseURL}${image}`} alt="" 
          className='w-[600px]'
      />
      <span className="bg-green-300 w-fit px-2 py-1 rounded-full text-green-800">{status}</span>
      <h1 className="text-4xl text-[#6415ff] font-bold">{title}</h1>
      <div className=''>
            {/* <div className='flex flex-col gap-4  justify-between'> */}
            <div className='flex flex-col p-2 rounded-md'>
              <div className="mb-10">
                <h1 className="text-xl font-bold mb-3">Date</h1>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className='text-lg text-[#6415ff]'/>
                  <p>{extractYear(startDate)} - {dateFormat(endDate)}</p>
                </div>
              </div>
              <div className="mb-10">
                <h1 className="text-xl font-bold mb-3">Time</h1>
                <div className="flex items-center gap-3">
                  <IoIosTime className='text-lg text-[#6415ff]'/>
                  <p>{formatTime(startTime)} - {formatTime(endTime)}</p>
                </div>
              </div>
              <div className="mb-10">
                <h1 className="text-xl font-bold mb-3">Location</h1>
                <div className="flex items-center gap-3">
                  <IoIosTime className='text-lg text-[#6415ff]'/>
                  <p>{location}</p>
                </div>
              </div>
              {/* <span className='p-4 bg-blue-200 rounded-lg'>
              <FaCalendarAlt className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Date</p>
                <h1 className='font-semibold'>{extractYear(startDate)} - {dateFormat(endDate)}</h1>
              </div> */}
              </div>
              
              {/* <div className='flex bg-gray-200 p-2 rounded-md'>
              <span className='p-4 bg-blue-200 rounded-lg'>
              <IoIosTime className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Time</p>
                <h1 className='font-semibold'>{formatTime(startTime)} - {formatTime(endTime)}</h1>
              </div>
              </div> */}

              {/* <div className='flex bg-gray-200 p-2 rounded-md'>
              <span className='p-4 bg-blue-200 rounded-lg'>
              <FaLocationDot className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Venue</p>
                <h1 className='font-semibold'>{location}</h1>
              </div>
              </div> */}
            {/* </div> */}
        </div>
    </div>
  )
}

export default ViewEventDetails