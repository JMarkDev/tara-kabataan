import  { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../../api/api'

const EditEvent = () => {
    const { id } = useParams()
    const [eventType, setEventType] = useState(false)
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      image: null,
      organizer_name: '',
      event_type: eventType,
      event_category: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      location: '',
      max_attendees: '',
      price: '00',
      discount: '00',
      status: 'Upcoming'
    })

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'image' ? files : value
        }))
    }

    const handleCategory = (e) => {
        const selectedCategory = e.target.value;
        setFormData({...formData, event_category: selectedCategory})
      }

      useEffect(() => {
        const fetchEvent = async () => {
          try {
            const response = await api.get(`/event/id/${id}`)
            setFormData(prevData => ({
              ...prevData, 
              title: response.data.event_title,
              description: response.data.event_description,
              image: response.data.image,
              organizer_name: response.data.organizer_name,
              event_type: response.data.event_type,
              event_category: response.data.event_category,
              start_date: response.data.start_date,
              end_date: response.data.end_date,
              start_time: response.data.start_time,
              end_time: response.data.end_time,
              location: response.data.location,
              max_attendees: response.data.max_attendees,
              price: response.data.price,
              discount: response.data.discount,
              status: response.data.status
            })
            )

            if(response.data.event_type === 'Paid') {
              setEventType(true)
            } else {
              setEventType(false)
            }
   
          } catch (error) {
            console.log(error)
          }

        }
        fetchEvent()
      }, [id])

      const handleUpdateEvent = async (e) => {
        e.preventDefault()
        const { title, description, image, organizer_name, event_type, event_category, start_date, end_date, start_time, end_time, location, max_attendees, price, discount, status } = formData
        
        try {
          const response = await api.put(`/event/update/${id}`, formData)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }

      

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mt-4 dark:text-white  ">Update Event Information </h2>
        <form onSubmit={handleUpdateEvent} method="PUT" encType="multipart/form-data"  className="mt-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
              Organizer
            </label>
            <input
              type="text"
              id="organizer_name"
              name="organizer_name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.organizer_name}
              onChange={(e) => setFormData({...formData, organizer_name: e.target.value})}
            />
          </div>
          <div className="mb-4 dark:text-white">
            <label htmlFor="image" className="block text-gray-700 font-bold dark:text-white ">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-center"
              required
              onChange={handleInputChange}              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 dark:text-white font-bold ">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="lg:flex justify-between gap-3">
          <div className="mb-4 w-full lg:w-[50%]">
            <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
              Type
            </label>
            <select name='event_type' className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " id=""
              required
              onChange={(e) => {
                handleInputChange(e);
                if(e.target.value === 'Paid') {
                  setEventType(true)
                } else {
                  setEventType(false)
                }
              }}
              value={formData.event_type}
            >
              <option value="">Select Event Type</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className='mb-4 w-full lg:w-[50%]'>
            <label htmlFor="description" className="block text-gray-700 dark:text-white font-bold ">
              Total Attendees 
            </label>
            <input
              type="number"
              id="max_attendees"
              name="max_attendees"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.max_attendees}
              onChange={handleInputChange}
            />
          </div>  
          </div>

          { eventType && (
            <div className='lg:flex justify-between gap-3'>
            <div className="mb-4 w-full lg:w-[50%]">
              <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
              <div className="mb-4 w-full lg:w-[50%]">
              <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
              Category
            </label>
            <select
              required
              onChange={handleCategory}
              value={formData.event_category}
              name='event_category'  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 " id="">
              <option value="" className="">Select Event Category</option>
              <option value="Conference">Conference</option>
              <option value="Seminar">Seminar</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Training">Training</option>
              <option value="Meeting">Meeting</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Symposium">Symposium</option>
              <option value="Networking-event">Networking Event</option>
              <option value="Summit">Summit</option>
            </select>
          </div>

          <div className="lg:flex justify-between gap-3">
            <div className="mb-4 w-full lg:w-[50%]">
              <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 w-full lg:w-[50%]">
              <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={formData.end_date}
                onChange={handleInputChange}
              />
          </div>
        </div>
        <div className="lg:flex justify-between gap-3">  
        <div className="mb-4 w-full lg:w-[50%]">
          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
            Start Time
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.start_time}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full lg:w-[50%]">
          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
            End Time
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.end_time}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
            Venue
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>
        {/* <div className='mb-4'>
          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
            Location
          </label>
          <LocationComponent />
        </div> */}
        <div className='flex justify-end'>
        <Link to="/admin-events" className="w-[150px] text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200">   
          Cancel
        </Link>
        <button
          type="submit"
          className="w-[150px] py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Update
        </button>
</div>


        </form>
      </div>
  )
}

export default EditEvent