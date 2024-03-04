import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useFormat } from "../hooks/useFormatDate";

const AttendeesTable = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);
  const { dateFormat } = useFormat();

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await api.get(`/attendees/event_id/${id}`);
        setAttendees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendees();
  }, [id]);

  return (
    <div className="bg-white relative overflow-x-auto">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl text-[#3d4465] font-semibold">Attendees List</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 px-3 rounded-lg">
          Download
        </button>
      </div>
      {attendees.length === 0 && (
        <p className="p-2 px-3 text-red-500">No attendees joined yet.</p>
      )}
      <table className="w-full mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-nowrap">
              USER ID
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              DATE
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              NAME
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Gender
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Birth Date
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Phone NO.
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              LOCATION
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              PAYMENT METHOD
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              REGISTRATION FEE
            </th>
          </tr>
        </thead>
        <tbody>
          {attendees.map(
            ({
              id,
              user_id,
              registration_time,
              attendee_name,
              gender,
              birthdate,
              phone_number,
              location,
              payment_method,
              total_amount,
            }) => (
              <tr
                key={id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3 text-nowrap">{user_id}</td>
                <td className="px-6 py-3 text-nowrap">
                  {dateFormat(registration_time)}
                </td>
                <td className="px-6 py-3 text-nowrap">{attendee_name}</td>
                <td className="px-6 py-3">{gender}</td>
                <td className="px-6 py-3 text-nowrap">
                  {dateFormat(birthdate)}
                </td>
                <td className="px-6 py-3 text-nowrap">{`+ ${phone_number}`}</td>
                <td className="px-6 py-3 text-nowrap">{location}</td>
                <td className="px-6 py-3">{payment_method}</td>
                <td className="px-6 py-3">{total_amount}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeesTable;
