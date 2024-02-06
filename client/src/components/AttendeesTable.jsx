import React from 'react'

const AttendeesTable = () => {
  return (
    

<div className="relative overflow-x-auto">
    <h1 className='py-3 text-xl text-[#3d4465] font-semibold'>Attendees List</h1>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ATTENDEES ID
                </th>
                <th scope="col" className="px-6 py-3">
                    DATE
                </th>
                <th scope="col" className="px-6 py-3">
                    NAME
                </th>
                <th scope="col" className="px-6 py-3">
                    Gender
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone NO.
                </th>
                <th scope="col" className="px-6 py-3">
                    LOCATION
                </th>
            </tr>
        </thead>
        <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-3">
                001
            </td>
            <td className="px-6 py-3">
                2024-02-05
            </td>
            <td className="px-6 py-3">
                John Doe
            </td>
            <td className="px-6 py-3">
                Male
            </td>
            <td className="px-6 py-3">
                +1 123-456-7890
            </td>
            <td className="px-6 py-3">
                New York, USA
            </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-3">
                001
            </td>
            <td className="px-6 py-3">
                2024-02-05
            </td>
            <td className="px-6 py-3">
                John Doe
            </td>
            <td className="px-6 py-3">
                Male
            </td>
            <td className="px-6 py-3">
                +1 123-456-7890
            </td>
            <td className="px-6 py-3">
                New York, USA
            </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-3">
                001
            </td>
            <td className="px-6 py-3">
                2024-02-05
            </td>
            <td className="px-6 py-3">
                John Doe
            </td>
            <td className="px-6 py-3">
                Male
            </td>
            <td className="px-6 py-3">
                +1 123-456-7890
            </td>
            <td className="px-6 py-3">
                New York, USA
            </td>
            </tr>
        </tbody>
    </table>
</div>

  )
}

export default AttendeesTable