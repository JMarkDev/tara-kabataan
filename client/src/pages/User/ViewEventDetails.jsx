import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from '../../api/api'
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useFormat } from "../../hooks/useFormatDate";
import FeatureImageGallery from '../../components/FeaturedImageGallery'
import JoinEvent from './JoinEvent'
import Cookies from "js-cookie";

const ViewEventDetails = () => {
  const { id }  = useParams();
  const [modal, setModal] = useState(false);
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
  const userId = Cookies.get('userId')
  const token = Cookies.get('token')
  const role = Cookies.get('role')
  const navigate = useNavigate()
 
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

  const handleJoinAttendees = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post('/attendees/add')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setModal(false)
  }

  return (
    <>
    <div className="lg:px-20  py-10 flex flex-col-2 md:flex-row flex-col gap-5">
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
                  <p className="mt-5">{description}</p>
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
                  <p>₱ {price}</p>
                </div>
                { discount !== '0.00' && (
                  <>
                  <div className="flex justify-between">
                  <p>Discount</p>
                  <p>₱ {discount}</p>
                </div>
                  </>
                )}
                </>
              )}
              { status === 'Upcoming' ? (
                <>
                  <div className="flex justify-between">
                    <p>Registration</p>
                    <p>Open</p>
                  </div>
                  <button
                      onClick={() => {
                        if (!userId || !role || !token) {
                            navigate('/register');
                        } else {
                            setModal(true);
                        }
                    }}          
                      className="p-2 w-full px-5 bg-blue-600 hover:bg-blue-700 text-white mt-5 rounded-full">
                    Join Now
                  </button>
                  {modal && (
                    <JoinEvent handleClose={handleClose}/>
                  )}
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
      <div className="bg-white p-5 lg:px-[200px]">
        <FeatureImageGallery id={id}/>
        <div className="bg-gray-100 p-5">
          <h1 className="font-bold text-lg md:text-2xl my-5">Event Feedback</h1>
          <div className="flex md:flex-row flex-col">
            <textarea name="" id="" className="w-full p-5 border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " 
            rows="5" placeholder="Tell me about your experience"></textarea>
            <div className="p-5">
              <input type="file" className="w-full p-2 border border-gray-300 rounded-md" accept="image/*" onchange="previewImage(event)" />
              <button className="p-2 mt-5 w-full rounded-full bg-blue-500 text-white">Submit</button>
            </div>
          </div>
          <p className="my-5">There are no reviews for this event yet</p>
        </div>

      </div>
    )}
    </>
    
  )
}

export default ViewEventDetails