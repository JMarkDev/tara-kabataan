import React, { useEffect, useState } from "react";
import userIcon from "../assets/images/user.png";
import Cookies from "js-cookie";
import api from "../api/api";
import { useFormat } from "../hooks/useFormatDate";
import { Link } from "react-router-dom";

const Notification = ({
  data,
  attendees,
  handleCloseNotification,
  handleCloseNotificationAdmin,
}) => {
  const { dateFormat } = useFormat();
  const role = Cookies.get("role");

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="absolute top-[60px] right-5 mr-[-10px] ">
        <div className="bg-white rounded-lg border h-[400px] w-[320px] absolute  z-20 right-2 overflow-y-auto ">
          <h1 className="text-md pl-3 font-semibold border-b border-gray-300 py-2">
            Notifications
          </h1>
          <ul className="w-full">
            {role === "admin" ? (
              <>
                {attendees.map(
                  (
                    {
                      image,
                      attendee_name,
                      user,
                      message,
                      created_at,
                      id,
                      event_id,
                      is_read,
                    },
                    index
                  ) => (
                    <Link key={index} to={`/view-event/${event_id}`}>
                      <li
                        onClick={() =>
                          handleCloseNotificationAdmin(false, event_id)
                        }
                      >
                        <div
                          className={`${
                            !is_read ? "bg-gray-200" : ""
                          } gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                                        border-b border-gray-300 dark:hover:bg-gray-20 hover:bg-gray-200`}
                        >
                          <img
                            src={`${
                              user && user.image
                                ? `${api.defaults.baseURL}${user.image}`
                                : `${userIcon}`
                            }  `}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <div>
                            <p className="font-bold">{attendee_name}</p>
                            <p>{truncateText(message, 28)}</p>
                            <p className="text-xs ">
                              {dateFormat(created_at)}
                              {/* Jan 01, 2021 - <span>02:25 PM</span> */}
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )
                )}
              </>
            ) : (
              <>
                {data?.map(
                  (
                    {
                      message,
                      image,
                      created_at,
                      event_status,
                      event_id,
                      is_read,
                    },
                    index
                  ) => (
                    <Link
                      key={index}
                      to={`/event/${event_id}`}
                      className="text-blue-600"
                    >
                      <li
                        onClick={() => handleCloseNotification(false, event_id)}
                      >
                        <div
                          className={`${
                            !is_read ? "bg-gray-200" : ""
                          } gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                                        border-b border-gray-300 dark:hover:bg-gray-20 hover:bg-gray-200`}
                        >
                          <img
                            src={`${
                              image === null
                                ? `${userIcon}`
                                : `${api.defaults.baseURL}${image}`
                            } `}
                            alt=""
                            className="w-[50px] h-[50px] rounded-lg"
                          />
                          <div>
                            <p className="font-bold">
                              {truncateText(message, 28)}
                            </p>
                            <p className="text-xs ">{dateFormat(created_at)}</p>
                            <span className="text-blue-500">
                              {event_status === "Upcoming"
                                ? "Click to join event"
                                : "Click to review event"}
                            </span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notification;
