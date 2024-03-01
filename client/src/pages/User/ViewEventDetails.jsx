import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from '../../api/api'
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useFormat } from "../../hooks/useFormatDate";
import FeatureImageGallery from '../../components/FeaturedImageGallery'

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
      } catch (error) {
        console.error(error)
      }
    }
    getEventDetails()
  }, [id])

  return (
    <>
    <div className="lg:px-20 px-5 py-10 flex flex-col-2 md:flex-row flex-col gap-5">
      {/* <h1>Event Details</h1> */}
      <div className="w-full bg-gray-100 p-5">
        <img src={`${api.defaults.baseURL}${image}`} alt="" 
            className='w-full md:h-[400px] mb-5'
        />
        <span className=" bg-green-300 w-fit px-2 py-1 rounded-full text-green-800">{status}</span>
        <h1 className="md:text-4xl text-xl py-3 text-[#6415ff] font-bold">{title}</h1>
        <div className=''>
              {/* <div className='flex flex-col gap-4  justify-between'> */}
              <div className='flex flex-col p-2 rounded-md'>
                <div className="mb-5">
                  <h1 className="text-xl font-bold mb-3">Date</h1>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className='md:text-2xl text-lg text-[#6415ff]'/>
                    <p>{extractYear(startDate)} - {dateFormat(endDate)}</p>
                  </div>
                </div>
                <div className="mb-5">
                  <h1 className="text-xl font-bold mb-3">Time</h1>
                  <div className="flex items-center gap-3">
                    <IoIosTime className='md:text-2xl text-lg text-[#6415ff]'/>
                    <p>{formatTime(startTime)} - {formatTime(endTime)}</p>
                  </div>
                </div>
                <div className="mb-5">
                  <h1 className="text-xl font-bold mb-3">Venue</h1>
                  <div className="flex items-center gap-3">
                    <FaLocationDot className='md:text-2xl text-lg text-[#6415ff]'/>
                    <p>{location}</p>
                  </div>
                </div>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-[#6415ff]">About this event</h1>
                  <p>{description}</p>
                </div>
          </div>
      </div>
        <div className="md:w-[50%] w-full">
          <div className="bg-gray-100 sticky top-5 p-5 rounded-md">
            {/* <h1 className="text-xl font-bold text-[#6415ff]">Event Details</h1> */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>Organizer</p>
                <p>{organizer}</p>
              </div>
              <div className="flex justify-between">
                <p>Event Type</p>
                <p>{eventType}</p>
              </div>
              <div className="flex justify-between">
                <p>Category</p>
                <p>{eventCategory}</p>
              </div>
              { eventType === 'Registration Fee' && (
                <>
                <div className="flex justify-between">
                  <p>Price</p>
                  <p>{price}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p>{discount}</p>
                </div>
                </>
              )}
              { status === 'Upcoming' ? (
                <>
                  <div className="flex justify-between">
                    <p>Registration</p>
                    <p>Open</p>
                  </div>
                  <button className="p-2 w-full px-5 bg-blue-600 hover:bg-blue-700 text-white mt-5 rounded-full">Join Now</button>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <p>Registration</p>
                    <p>Closed</p>
                  </div>
                  <button>
                    <p className="p-2 w-full px-5 bg-green-400 text-green-800 mt-5 rounded-full">Event Completed</p>
                  </button>
                </>
              )}                   
               </div>
               
          </div>
         
        </div>
    </div>
    {status === 'Completed' && (
      <div className="bg-gray-100 p-5 lg:px-[200px]">
        <FeatureImageGallery id={id}/>

        <h1 className="font-bold text-lg md:text-2xl my-5">Event Review</h1>
        <div className="flex">
          <textarea name="" id="" className="w-full p-5" rows="7" placeholder="Tell me about your experience"></textarea>
          <div className="p-5">
            <input type="file"/>
            <button className="p-2 mt-5 w-[200px] rounded-full bg-blue-400">Submit</button>
          </div>
        </div>
        <p>There are no reviews for this event yet</p>
      </div>
    
    )}
    </>
    
  )
}

export default ViewEventDetails