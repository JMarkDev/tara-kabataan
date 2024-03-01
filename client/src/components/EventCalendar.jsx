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
                const response = await api.get('/event/all/upcoming');
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
        <div className=''>
        <div className=' lg:px-20 px-5 rounded-lg'>
            <div className='px-5 flex justify-between items-center bg-blue-200'>
                <h1 className='p-3 text-[#243e63] text-lg lg:text-2xl font-bold'>{monthName} {year}</h1>
                <div className='flex items-center bg-[#6415ff] hover:bg-indigo-600 text-white px-3 rounded-lg'>
                    <button className='text-lg lg:text-xl p-2' onClick={handleBack}><MdArrowBackIos /></button>
                    <span className="font-bold text-xl text-[#9E9E9E] mx-2">|</span>
                    <button className='text-lg lg:text-xl p-2' onClick={handleNext}><MdArrowForwardIos /></button>
                </div>
            </div>
            <div className='overflow-x-auto grid grid-cols-7 bg-white border-gray-300 border'>
                {week.map((day, index) => (
                    <div key={index} className='w-auto p-3 md:text-lg text-sm text-center border-gray-200 border'>{day}</div>
                ))}
                {Array.from({ length: firstDayOfWeek }, (_, index) => (
                    <div key={`empty-${index}`} className='hover:bg-gray-200 h-auto p-1 md:text-lg text-sm border border-gray-200'></div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={index} className={`hover:bg-gray-200 p-2 min-h-20 text-sm border  border-gray-200`}>
                        {day}
                        <span className=''>{getEventsForDay(day)}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    

    );
};

export default EventCalendar;
