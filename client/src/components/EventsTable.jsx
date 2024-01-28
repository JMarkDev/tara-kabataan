import  { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import PropTypes from "prop-types";

const EventsTable = ({ data }) => {
    const [openAction, setOpenAction] = useState(false);

    EventsTable.propTypes = {
        data: PropTypes.array.isRequired
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
            Event Type
        </th>
        <th scope="col" className="px-6 py-3">
            Location
        </th>
        <th scope="col" className="px-6 py-3">
            No. Attendees
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
            { data.map((event) => {
                return (
                <tr key={event.id} className="bg-white hover:bg-gray-100 border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {event.id}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {event.event_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {event.start_date} - {event.end_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {event.start_time} - {event.end_time}
                        </td>
                        <td className="px-6 py-4">
                            {event.event_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {event.location}
                        </td>
                        <td className="px-6 py-4">
                            {event.max_attendees}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 font-normal leading-tight ${event.status === 'Completed' ? 'text-green-700  green-blue-700 bg-green-100 rounded-full green:bg-blue-700 ' : ' text-blue-700 bg-blue-100 rounded-full  dark:text-blue-100'}rounded-full`}>
                                {event.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center text-md gap-5 relative">
                            <div className="relative">
                                <button onClick={() => {
                                    setOpenAction(event.id === openAction ? null : event.id)
                                    }}
                                    className="text-xl text-gray-800 font-semibold"
                                >
                                <BsThreeDots />
                                </button>
                                {openAction === event.id && (
                                <div className="z-20 absolute flex flex-col right-0 bottom-0 w-48 py-2 mt-2 bg-white rounded-md shadow-2xl transform translate-y-full">
                                    <a href="#" className="px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">View</a>
                                    <a href="#" className="px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Edit</a>
                                    <a href="#" className="px-6 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Delete</a>
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

export default EventsTable

{/* <span className="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-100">
                        Upcoming
                    </span> */}