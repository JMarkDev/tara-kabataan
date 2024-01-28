import PropTypes from "prop-types";

const UserTable = ({ data }) => {

    UserTable.propTypes = {
        data: PropTypes.array.isRequired
    }
    
  return (
<div className="relative overflow-x-auto rounded-md">
    <table className="w-full text-md text-left rtl:text-right text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300 ">
        <tr className="whitespace-nowrap">
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
            { data.map((user) => {
                return (
                <tr key={user.id} className="bg-white hover:bg-gray-100 border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {user.firstname} {user.lastname}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.role}
                        </td>
                        <td className="px-6 py-4">
                            {user.gender}
                        </td>
                        <td className="px-6 py-4 text-md gap-5 relative">
                            <div className="flex gap-5">
                                <button>
                                    Edit
                                </button> 
                                <button>
                                    Delete
                                </button>
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

export default UserTable;