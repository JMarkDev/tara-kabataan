import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import api from "../api/api";
import { useFormat } from "../hooks/useFormatDate";
import Cookies from "js-cookie";

const EventCalendar = () => {
  const formatTime = useFormat();
  const role = Cookies.get("role");
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(month + 1);
  const [monthName, setMonthName] = useState(monthList[month]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const [events, setEvents] = useState([]);
  const [disabledBack, setDisabledBack] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    if (monthIndex > currentMonth && year >= currentYear) {
      setDisabledBack(true);
    } else {
      setDisabledBack(false);
    }
  }, [monthIndex, year]);

  useEffect(() => {
    const firstDay = new Date(year, monthIndex - 1, 1).getDay();
    setFirstDayOfWeek(firstDay);
  }, [monthIndex, year]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await api.get("/event/all");
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpcomingEvents();
  }, []);

  const handleNext = () => {
    const nextMonthIndex = (monthIndex % 12) + 1;
    setMonthIndex(nextMonthIndex);
    setMonthName(monthList[nextMonthIndex - 1]);
    setYear(nextMonthIndex === 1 ? year + 1 : year);
  };

  const handleBack = () => {
    const nextMonthIndex = monthIndex === 1 ? 12 : monthIndex - 1;
    setMonthIndex(nextMonthIndex);
    setMonthName(monthList[nextMonthIndex - 1]);
    setYear(nextMonthIndex === 12 ? year - 1 : year);
  };

  const daysInMonth = new Date(year, monthIndex, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const eventsForDay = (day) => {
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start_date);

      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() + 1 === monthIndex &&
        eventDate.getFullYear() === year
      );
    });

    return filteredEvents.map((event, index) => (
      <Link
        to={role === "admin" ? `/view-event/${event.id}` : `/event/${event.id}`}
        key={index}
      >
        <button
          className={`${
            event.status === "Completed" ? "bg-gray-300" : ""
          } p-1 rounded-lg hover:bg-gray-200 text-center text-sm  `}
          style={{ color: getNextColor() }}
        >
          <span className=" hidden md:block">
            {truncateText(event.event_title, 30)}
            <br />
            {formatTime.formatTime(event.start_time) +
              " - " +
              formatTime.formatTime(event.end_time)}
          </span>
        </button>
      </Link>
    ));
  };
  const getEventsForDay = (day) => {
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start_date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() + 1 === monthIndex &&
        eventDate.getFullYear() === year
      );
    });

    if (filteredEvents.length > 0) {
      return (
        <Link
          to={`/event/${filteredEvents[0].id}`} // Assuming you want to navigate to the first event on that day
          className="text-center block"
        >
          <button
            className={`bg-[#6415ff] text-white p-1 w-[30px] h-[30px] rounded-full`}
          >
            {day}
          </button>
        </Link>
      );
    } else {
      return (
        <button className={`p-1 w-[30px] h-[30px] rounded-full`}>{day}</button>
      );
    }
  };

  const COLORS = [
    "#e88245",
    "#8daa3b",
    "#1f82c1",
    "#9333ea",
    "#ff5733",
    "#6c5b7b",
    "#ffcc29",
    "#00a8cc",
  ];

  const getNextColor = () => {
    const color = COLORS.shift();
    COLORS.push(color);
    return color;
  };

  return (
    <div className="">
      <div className=" rounded-lg">
        <div className="px-5 flex justify-between items-center bg-blue-200">
          <h1 className="p-3 text-[#243e63] text-lg lg:text-2xl font-bold">
            {monthName} {year}
          </h1>
          <div className="flex items-center bg-[#6415ff]  text-white p-2 rounded-lg">
            {disabledBack && (
              <button
                className="gap-2 bg-gray-500 hover:bg-gray-600 flex items-center text-sm lg:text-xl p-2 rounded-lg"
                onClick={handleBack}
              >
                <MdArrowBackIos />
                Back
              </button>
            )}

            <span className="font-bold text-xl text-[#9E9E9E] mx-2">|</span>
            <button
              className="gap-2 bg-gray-500 hover:bg-gray-600 flex items-center text-sm lg:text-xl p-2 rounded-lg"
              onClick={handleNext}
            >
              Next
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto grid grid-cols-7 bg-white border-gray-300 border">
          {week.map((day, index) => (
            <div
              key={index}
              className="w-auto p-3  md:text-lg text-sm text-center border-gray-200 border"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfWeek }, (_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-20 hover:bg-gray-200  p-1 md:text-lg text-sm border border-gray-200"
            ></div>
          ))}
          {daysArray.map((day, index) => {
            return (
              <div
                key={index}
                className={`relative flex justify-center items-center md:justify-start md:items-start md:flex-col hover:bg-gray-200 p-2 min-h-20 text-sm border  border-gray-200`}
              >
                <span>{getEventsForDay(day)}</span>
                <span className="mt-2 ">{eventsForDay(day)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
