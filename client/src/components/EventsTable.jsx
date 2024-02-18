import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import PropTypes from "prop-types";
import api from '../api/api'
import CompleteEvent from "./CompleteEvent";
import { useFormat } from "../hooks/useFormatDate"; 

const EventsTable = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [eventID, setEventID] = useState(null)
    const { formatTime } = useFormat()

    useEffect(() => {
        setEventData(data)
    }, [data])

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/event/delete/${id}`)
            if(response.data.status === 'success') {
                alert(response.data.message)
            
                const newEventData = eventData.filter((event) => event.id !== id)
                setEventData(newEventData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateFormat = (date) => {
        const month = parseInt(date.substring(5, 7), 10) - 1;
        const day = date.substring(8, 10);
        const year = date.substring(0, 4);

        return `${day} ${monthName[month]} ${year}`
    }

    const extractYear = (date) => {
        const month = parseInt(date.substring(5, 7), 10) - 1;
        const day = date.substring(8, 10);

        return `${day} ${monthName[month]}`
    }

    const handleOpenModal = (id) => {
        setOpenModal(true)
        setOpenAction(false)
        setEventID(id)
    }

    const handleCloseModal = (id) => {
        const newEventData = eventData.filter((event) => event.id !== id)
        setEventData(newEventData)
        setOpenModal(false)
        setOpenAction(false)
    }
     
  return (
<div className="relative overflow-x-auto rounded-md">
    <table className="w-full text-md text-left rtl:text-right text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300 ">
        <tr className="whitespace-nowrap">
        <th scope="col" className="px-6 py-3 ">
            Event ID
        </th>
        <th scope="col" className="px-6 py-3">
            Event Name
        </th>
        <th scope="col" className="px-6 py-3">
            Event Date
        </th>
        <th scope="col" className="px-6 py-3">
            Event Time
        </th>
        <th scope="col" className="px-6 py-3">
            Event Category
        </th>
        <th scope="col" className="px-6 py-3">
            Event Type
        </th>
        <th scope="col" className="px-6 py-3">
            Location
        </th>
        <th scope="col" className="px-6 py-3">
            Status
        </th>
        <th scope="col" className="px-6 py-3">
            Action
        </th>
    </tr>
        </thead>
        <tbody>
            { eventData.map(({ id, event_title, event_category, start_date, end_date, start_time, end_time, event_type, location, max_attendees, status }) => {
                return (
                <tr key={id} className="bg-white hover:bg-gray-100 border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {id}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {event_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {extractYear(start_date)} - {dateFormat(end_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {formatTime(start_time)} - {formatTime(end_time)}
                        </td>
                        <td className="px-6 py-4">
                            {event_category}
                        </td>
                        <td className="px-6 py-4">
                            {event_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {location}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-2 font-normal leading-tight ${status === 'Completed' ? 'text-green-700  green-blue-700 bg-green-100 rounded-full green:bg-blue-700 ' : ' text-blue-700 bg-blue-100 rounded-full  dark:text-blue-100'}rounded-full`}>
                                {status}
                            </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center text-md gap-5 relative">
                                { openModal && (
                                        <CompleteEvent 
                                        openModal={openModal} 
                                        handleCloseModal={handleCloseModal}
                                        eventID={eventID}
                                        eventData={eventData}
                                        />
                                )}
                            <div className="relative">
                                <button onClick={() => {
                                    setOpenAction(id === openAction ? null : id)
                                    }}
                                    className="text-xl text-gray-800 font-semibold"
                                >
                                <BsThreeDots />
                                </button>
                                {openAction === id && (
                                <div className="z-20 absolute flex flex-col right-[-25px] bottom-2 w-48 py-2 mt-2 bg-white rounded-md shadow-2xl transform translate-y-full">
                                    {  status === 'Completed' ? null : (
                                        <button 
                                        onClick={() => handleOpenModal(id)}
                                        className="text-left px-6 py-2 text-gray-800 hover:bg-gray-200">
                                            Complete
                                        </button>
                                    )}
                                    
                                    <Link to={`/view-event/${id}`} className="text-left px-6 py-2 text-gray-800 hover:bg-gray-200">
                                    View
                                    </Link>
                                    {  status === 'Completed' ? null : (
                                        <Link to={`/edit-event/${id}`} className="text-left px-6 py-2 text-gray-800 hover:bg-gray-200" >
                                            Edit
                                        </Link>
                                    )}
   
                                    <button className="text-left px-6 py-2 text-gray-800 hover:bg-gray-200" onClick={() => handleDelete(id)}>
                                    Delete
                                    </button>
                                </div>
                                )}

                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    </table>
</div>

  )
}

EventsTable.propTypes = {
    data: PropTypes.array.isRequired
}

export default EventsTable
