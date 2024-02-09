import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api/api'
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import PieChart from '../../../components/PieChart'
import AttendeesTable from '../../../components/AttendeesTable';
import { useFormat } from '../../../hooks/useFormatDate'
import ImageGalery from '../../../components/ImageGalery';

const ViewEvent = () => {
  const { id } = useParams()
  const [displayPrice, setDisplayPrice] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventCategory, setEventCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [starTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [attendanceCount, setAttendanceCount] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [status, setStatus] = useState('')
  const { dateFormat, formatTime} = useFormat()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/event/id/${id}`)
        const data = response.data
        setTitle(data.event_title)    
        setDescription(data.event_description)
        setImage(data.image)
        setOrganizer(data.organizer_name)
        setEventType(data.event_type)
        setEventCategory(data.event_category)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
        setStartTime(data.start_time)
        setEndTime(data.end_time)
        setLocation(data.location)
        setAttendanceCount(data.attendance_count)
        setPrice(data.price)
        setDiscount(data.discount)
        setStatus(data.status)
        if(data.event_type === 'Paid') {
          setDisplayPrice(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#3d4465]">Event Details</h1>
      <div className="flex my-5 gap-5 lg:flex-row flex-col justify-between">
        <div className="text-[#3d4465] lg:w-[70%] h-fit bg-white p-5 rounded-md">
          <img src={`${api.defaults.baseURL}${image}`} alt="" 
          className='w-full'
          />
          <h1 className='text-xl pt-4 font-semibold '>{title}</h1>
          <h2 className='py-2'>Organizer Name:<span className='font-bold'>{organizer}</span></h2>

          <p className='text-md '>{description}</p>
          <div className='pt-5'>
            <div className='flex flex-col gap-4  justify-between'>
            <div className='flex bg-gray-200 p-2 rounded-md'>
            <span className='p-4 bg-blue-200 rounded-lg'>
              <FaCalendarAlt className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Date</p>
                <h1 className='font-semibold'>{dateFormat(startDate)} - {dateFormat(endDate)}</h1>
              </div>
              </div>
              
              <div className='flex bg-gray-200 p-2 rounded-md'>
              <span className='p-4 bg-blue-200 rounded-lg'>
              <IoIosTime className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Time</p>
                <h1 className='font-semibold'>{formatTime(starTime)} - {formatTime(endTime)}</h1>
              </div>
              </div>

              <div className='flex bg-gray-200 p-2 rounded-md'>
              <span className='p-4 bg-blue-200 rounded-lg'>
              <FaLocationDot className='text-2xl'/>
              </span>
              <div className='leading-6 px-2 flex flex-col justify-center'>
                <p className='text-md font-normal'>Venue</p>
                <h1 className='font-semibold'>{location}</h1>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%] p-5 bg-white h-fit text-[#3d4465]">
          <div className='flex justify-between gap-3'>
          <div className='bg-gray-200 p-3 w-full rounded-md'>
            <p className='text-md font-normal'>Total Attendees</p>
            <h1 className='text-lg font-semibold'>
              100
            </h1>
          </div>
          <div className='bg-gray-200 p-3 w-full rounded-md'>
            <p className='text-md font-normal'>Total Revenue</p>
            <h1 className='text-lg font-semibold'>
              100
            </h1>
          </div>
          </div>
        <div className='mt-5'>
        <PieChart />
        </div>
      <div className='mt-10'>
        <h1 className='mt-3 font-semibold'>Event Category: <span className='font-normal'>{eventCategory}</span></h1>
        <h1 className='mt-3 font-semibold'>Event Status: <span className='font-normal'>{status}</span></h1>
        <h1 className='mt-3 font-semibold'>Event Type: <span className='font-normal'>{eventType}</span></h1>
        { displayPrice && (
          <>
        <h1 className='mt-3 font-semibold'>Attendance Count: <span className='font-normal'>{attendanceCount}</span></h1>
        <div className='flex justify-between gap-5'>
          <div className='w-full mt-5 bg-gray-200 p-3 rounded-md'>
            <p>Total Price</p>
            <h1 className='font-semibold text-xl pt-2'>₱ {price}</h1>
          </div>
          <div className='w-full mt-5 bg-gray-200 p-3 rounded-md'>
            <p>Total Discount</p>
            <h1 className='font-semibold text-xl pt-2'>₱ {discount}</h1>
          </div>
        </div>
          </>
        )}
    
      </div>
        </div>
      </div>
      <div className='mt-7'>
        <AttendeesTable />
      </div>
      <div className='mt-7'>
        <ImageGalery />
      </div>
    </div>
  )
}

export default ViewEvent