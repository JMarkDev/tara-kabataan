import React, { useEffect, useState } from 'react';
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import api from '../api/api';
import useColorGenerator from '../hooks/useColorGenerator';

const EventCalendar = () => {
    const { getNextColors, usedColors } = useColorGenerator();

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = new Date().getMonth();
    const [monthIndex, setMonthIndex] = useState(month + 1);
    const [monthName, setMonthName] = useState(monthList[month]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const firstDay = new Date(year, monthIndex - 1, 1).getDay();
        setFirstDayOfWeek(firstDay);
    }, [monthIndex, year]);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await api.get('/event/upcoming');
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
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    const dateFormat = (date) => {
        const eventDate = new Date(date);
        return `${eventDate.getDate()} ${monthList[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
    };

    const getEventsForDay = (day) => {
        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.start_date);
            return eventDate.getDate() === day && eventDate.getMonth() + 1 === monthIndex && eventDate.getFullYear() === year;
        });

        return filteredEvents.map((event, index) => (
            <div key={index} style={{color: getNextColor()}}>
                {event.event_title}
            </div>
        ));
    };

    const COLORS = [
        '#e88245', 
        '#8daa3b', 
        '#1f82c1', 
        '#9333ea', 
        '#ff5733', 
        '#6c5b7b', 
        '#ffcc29', 
        '#00a8cc'];
    
    
      const getNextColor = () => {
        const color = COLORS.shift();
        COLORS.push(color);
        return color;
      };

    return (
        <div className='overflow-x-auto overflow-y-auto w-full lg:px-20 px-5 rounded-lg'>
            <div className='px-5 flex justify-between items-center bg-blue-200'>
                <h1 className='p-3 text-[#243e63] text-lg lg:text-2xl font-bold'>{monthName} {year}</h1>
                <div className='flex gap-5 bg-[#6415ff] hover:bg-indigo-600 text-white p-2 px-5 rounded-lg'>
                    <button className='text-lg lg:text-2xl' onClick={handleBack}><MdArrowBackIos /></button>
                    <button className='text-lg lg:text-2xl' onClick={handleNext}><MdArrowForwardIos /></button>
                </div>
            </div>
            <div className=' grid grid-cols-7 bg-white border-gray-300 border'>
                {week.map((day, index) => (
                    <div key={index} className='p-3 md:text-lg text-sm text-center border-gray-200 border'>{day}</div>
                ))}
                {Array.from({ length: firstDayOfWeek }, (_, index) => (
                    <div key={`empty-${index}`} className='h-20 p-1 md:text-lg text-sm border border-gray-200'></div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={index} 
                    // style={{background: getEventsForDay(day) ? getNextColor() : null}}
                    className={`p-2 min-h-20 text-sm border  border-gray-200`}>
                        {day}
                        <span>{getEventsForDay(day)}</span>
                    </div>
                ))}
            </div>
            <div></div>
        </div>
    );
};

export default EventCalendar;
