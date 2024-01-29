import { useState } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";

const UserTable = ({ data }) => {
    const [openAction, setOpenAction] = useState(false);
    
  return (
<div className="relative overflow-x-auto rounded-md">
    <table className="w-full text-md text-left rtl:text-right text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300 ">
        <tr className="whitespace-nowrap">
        <th scope="col" className="px-6 py-3">
            User ID
        </th>
        <th scope="col" className="px-6 py-3">
            Name
        </th>
        <th scope="col" className="px-6 py-3">
            Email
        </th>
        <th scope="col" className="px-6 py-3">
            Role
        </th>
        <th scope="col" className="px-6 py-3">
            Gender
        </th>
        <th scope="col" className="px-6 py-3">
            Action
        </th>
    </tr>
        </thead>
        <tbody>
            { data.map(({ id, firstname, lastname, email, role, gender }) => {
                return (
                <tr key={id} className="bg-white hover:bg-gray-100 border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {id}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {firstname} {lastname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {role}
                        </td>
                        <td className="px-6 py-4">
                            {gender}
                        </td>
                        <td className="px-6 py-4 flex justify-center text-md gap-5 relative">
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

UserTable.propTypes = {
    data: PropTypes.array.isRequired
}

export default UserTable;