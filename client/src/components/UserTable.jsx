import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import imgNotify from "../assets/images/undraw_notify_re_65on.svg";

const UserTable = ({ data, handleDelete }) => {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="lg:text-4xl font-bold">No Users Found</h1>
          <img src={imgNotify} alt="empty" className="h-[50vh] mt-5" />
        </div>
      ) : (
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
              {data.map(
                ({ id, firstname, lastname, email, role, gender }, index) => {
                  return (
                    <tr
                      key={id}
                      className="bg-white hover:bg-gray-100 border-b "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        {firstname} {lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">{email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{role}</td>
                      <td className="px-6 py-4">{gender}</td>
                      <td className=" flex justify-center items-center align-middle m-auto text-md gap-5 relative">
                        {/* <div > */}
                        {role === "admin" ? (
                          <Link
                            to={`/edit-admin/${id}`}
                            className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-blue-600 text-center flex items-center"
                          >
                            <FaRegEdit />
                          </Link>
                        ) : (
                          <Link
                            to={`/view-user/${id}`}
                            className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-blue-600 text-center flex items-center"
                          >
                            <MdRemoveRedEye />
                          </Link>
                        )}
                        <button className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-red-500">
                          <RiDeleteBin6Line onClick={() => handleDelete(id)} />
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default UserTable;
