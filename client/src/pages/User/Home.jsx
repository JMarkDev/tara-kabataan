import Carousel from "../../components/Carousel"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from '../../api/api'
import EventCard from "../../components/EventCard"
import FeaturedImageGallery from "../../components/FeaturedImageGallery"
import Accordion from "../../components/Accordion"
import FAQimage from '../../assets/images/FAQ.webp'
import ChatIcon from '../../assets/images/chat-message-icon-design-in-blue-circle-png.webp'
import Chatbot from "../../components/Chatbot"
import logo from '../../assets/images/tarakabataanLogo.jpg'
import EventCalendar from "../../components/EventCalendar"

const Home = () => {
  const [completedEventID, setCompletedEventID] = useState('')
  const [category, setCategory] = useState([])
  const [event, setEvent] = useState([])
  const [openChat, setOpenChat] = useState(false)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get('/category/all')
        setCategory(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get('/event/upcoming')
        setEvent(response.data.splice(0, 6))
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvent()
  }, [])

  useEffect(() => {
    const fetchEventCompleted = async () => {
      try {
        const response = await api.get('/event/completed')
        //get lastest completed event
        setCompletedEventID(response.data[response.data.length - 1].id)
        // const recentCompleted = response.data.sort((a, b) => {
        //   return new Date(b.end_date) - new Date(a.end_date);
        // });
        
        // setCompletedEventID(response.data[0].id)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEventCompleted()
  }, [])

  return (
    <>
      <div className="z-20 fixed right-5 bottom-5">
        {openChat && (
            <Chatbot setOpenChat={setOpenChat} openChat={openChat} />
       )} 
        <img src={ChatIcon} alt="chat icon" className="w-[60px] h-[60px] cursor-pointer hover:scale-110 transition-all"
        onClick={() => setOpenChat(!openChat)}
        />
      </div>
      <Carousel/>
      {/* <div className="lg:p-20 p-10 flex flex-col lg:flex-row justify-center items-center">
        <div className=" md:w-[50%] lg:w-[50%] flex justify-center items-center">
        <img src={logo} alt="logo" className="w-[350px] lg:h-[300px] rounded-xl"/>
        </div>
          <div className="shadow-lg bg-blue-100 mt-5 lg:w-[50%]  p-10">
            <h1 className="text-2xl text-[#6415ff] py-5 font-bold">
              Tara Kabataan
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className=" leading-7 text-gray-800 rounded-lg">
                <span className="font-bold">"Tara Kabataan: Web-Boosted Empowerment Hub" </span>
                 is an innovative aimed at fostering the growth and development of the youth. It is a platform that provides a wide range of opportunities for the youth to engage in various activities, events, and programs that are designed to help them grow and develop their skills, talents, and abilities. The platform is designed to provide the youth with a safe and supportive environment where they can connect with other like-minded individuals, learn new things, and explore new opportunities.
              </p>
      </div>

          </div>
      </div> */}
      <div>
      <h1 className="my-10 text-center text-[#243e63] lg:text-4xl text-2xl font-bold">Event<span className="text-[#6415ff]">Calendar</span></h1>
      <EventCalendar />
      </div>
<div className="">
    <div className="px-5 xl:px-20 pt-10 flex flex-col justify-center">
      <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold">Discover Our Exciting <span className="text-[#6415ff]">Categories</span></h1>
      <p className="text-center text-[#6b7280] lg:text-lg text-md mt-4">Explore a diverse range of event categories curated just for you. We have something amazing for everyone.</p>
    
      <div className="mx-auto lg:px-10 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-10">
        {category.map(({ id, category_name, image }) => (
          <div key={id} className="max-w-sm relative hover:scale-110 transition-all bg-white cursor-pointer rounded-md shadow-md">
            <img src={`${api.defaults.baseURL}${image}`} alt={category_name} className="w-full h-[250px] object-cover rounded-md" />
            <div className=" absolute inset-0 flex items-end p-5">
              <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
              <h1 className="text-[#fff] text-xl font-bold z-10">{category_name}</h1>
            </div>
          </div>
        ))}
      </div>

      </div>
      <div>
    </div>
    <div>
  <div className="px-5 xl:px-20">
    <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">Upcoming <span className="text-[#6415ff]">Events</span></h1>
    <p className="text-center text-[#6b7280] lg:text-lg text-md mt-4">Stay ahead of the curve with our upcoming events. Don't miss out - mark your calendar and join the fun!</p>
      <div className="flex flex-col mt-7 justify-center items-center">
        <EventCard event={event} />
        <Link to="/events" className=" mt-10">
          <button className="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-600 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-purple-600 hover:via-indigo-400 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            View All Events
          </button>
        </Link>
      </div>  
  </div>
  <div className="lg:px-[200px] px-5">
    <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">Recent Completed <span className="text-[#6415ff]">Event</span></h1>
    <p className="text-center text-[#6b7280] lg:text-lg text-md mt-4">Stay ahead of the curve with our upcoming events. Don't miss out - mark your calendar and join the fun!</p>
      <div className="mt-10">
        <FeaturedImageGallery id={completedEventID}/>
      </div>  
  </div>
      <div className="lg:px-20 pt-10 px-5">
          <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">Frequently Asked <span className="text-[#6415ff]">Questions</span></h1>
          <p className=" text-center text-[#6b7280] lg:text-lg text-md mt-4">We have answers to all your questions. If you have any other queries, feel free to reach out to us.</p>
          <div className="lg:flex lg:flex-row-reverse lg:justify-between gap-5 items-center">
            <img src={FAQimage} alt="FAQ" className="lg:w-1/2 md:m-auto md:w-1/2 lg:object-cover lg:rounded-md" />
            <Accordion className="lg:w-1/2 lg:mt-10" />
          </div>

      </div>
  </div>
</div>    
    </>

  )
}

export default Home