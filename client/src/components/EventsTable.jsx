import  { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const EventsTable = () => {
    const [openAction, setOpenAction] = useState(false);

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
            Date
        </th>
        <th scope="col" className="px-6 py-3">
            Time
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
            <tr className="bg-white hover:bg-gray-100 border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    Completed
                </td>
                <td className="px-6 py-4 flex justify-center text-xl gap-5 relative">
                    <div className="relative">
                        <button onClick={() => {
                        setOpenAction(!openAction)
                        }}>
                        <BsThreeDots />
                        </button>
                        {openAction && (
                        <div className=" absolute flex flex-col right-0 bottom-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl transform translate-y-full">
                            <a href="#" className="px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Edit</a>
                            <a href="#" className="px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Delete</a>
                        </div>
                        )}
                    </div>
                    </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
               <tr className="bg-white border-b hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    1
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    2
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    3
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td><td className="px-6 py-4">
                    Upcoming
                </td>
                <td className="px-6 py-4 flex justify-center text-xl gap-5 relative">
                    <div className="relative">
                        <button onClick={() => {
                        setOpenAction(!openAction)
                        }}>
                        <BsThreeDots />
                        </button>
                        {openAction && (
                        <div className=" absolute flex flex-col right-0 bottom-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl transform translate-y-full">
                            <a href="#" className="px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Edit</a>
                            <a href="#" className="px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Delete</a>
                        </div>
                        )}
                    </div>
                    </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    4
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                   Completed
                </td>
                <td className="px-6 py-4 flex justify-center text-xl gap-5 relative">
                    <div className="relative">
                        {/* <button onClick={() => {
                        setOpenAction(!openAction)
                        }}>
                        <BsThreeDots />
                        </button>
                        {openAction && (
                        <div className="absolute right-0 bottom-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl transform translate-y-full">
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Edit</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Delete</a>
                        </div>
                        )} */}
                    </div>
                    </td>
                </tr>
            
        </tbody>
    </table>
</div>

  )
}

export default EventsTable