import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { MdSearch } from "react-icons/md";
import EventCard from "../../components/EventCard";
import BackBtn from "../../components/BackBtn";

const FilteredCategory = () => {
  const [event, setEvent] = useState([]);
  const { category } = useParams();
  const [categoryName] = useState(category);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFilterEvents = async () => {
      try {
        let response;
        if (search) {
          response = await api.get(`/event/search/${search}/${category}`);
        } else {
          response = await api.get(`/event/filter/${category}`);
        }
        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilterEvents();
  }, [search, category]);

  return (
    <div className="px-5 ">
      <div className="mt-5 md:flex-row flex-col flex justify-between ">
        <div className="flex py-5 items-center">
          <BackBtn />
          <h1 className="text-[#243e63] lg:text-4xl text-xl font-bold">
            {categoryName} <span className="text-[#6415ff]">Events</span>
          </h1>
        </div>
        <div className="flex justify-end items-center">
          <input
            type="text"
            placeholder="search events..."
            className="w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute items-center mr-3">
            <MdSearch />
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-7 justify-center items-center">
        <EventCard event={event} />
      </div>
    </div>
  );
};

export default FilteredCategory;
