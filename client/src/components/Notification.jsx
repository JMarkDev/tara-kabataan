import React, { useEffect, useState } from "react";
import userIcon from "../assets/images/user.png";
import Cookies from "js-cookie";
import api from "../api/api";
import { useFormat } from "../hooks/useFormatDate";
import { Link } from "react-router-dom";

const Notification = () => {
  const { dateFormat } = useFormat();
  const role = Cookies.get("role");
  const [data, setData] = useState([]);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/event/all");
        const sortByDate = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setData(sortByDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await api.get("/attendees/all");
        const sortByDate = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        console.log(sortByDate);
        setAttendees(sortByDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendees();
  }, []);

  return (
    <>
      <div className="absolute top-[60px] right-5 mr-[-10px] ">
        <div className="bg-white rounded-lg border h-[400px] w-[320px] absolute  z-20 right-2 overflow-y-auto">
          <h1 className="text-md pl-3 font-semibold border-b border-gray-300 py-2">
            Notifications
          </h1>
          <ul className="w-full">
            {role === "admin" ? (
              <>
                {attendees.map(
                  ({
                    image,
                    attendee_name,
                    user,
                    event_name,
                    created_at,
                    id,
                  }) => (
                    <li key={id}>
                      <div
                        className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
              hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
                      >
                        <img
                          src={`${
                            user.image
                              ? `${api.defaults.baseURL}${user.image}`
                              : `${userIcon}`
                          }  `}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <div>
                          <p className="font-bold">{attendee_name}</p>
                          <p>{event_name}</p>
                          <p className="text-xs ">
                            {dateFormat(created_at)}
                            {/* Jan 01, 2021 - <span>02:25 PM</span> */}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </>
            ) : (
              <>
                {data.map(({ event_title, image, created_at, status, id }) => (
                  <li key={id}>
                    <div
                      className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
                    >
                      <img
                        src={`${api.defaults.baseURL}${image}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{event_title}</p>
                        <p className="text-xs ">{dateFormat(created_at)}</p>
                        <Link to={`/event/${id}`} className="text-blue-600">
                          {status === "Upcoming"
                            ? "Click to join event"
                            : "Click to review event"}
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notification;
