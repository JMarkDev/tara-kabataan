import React, { useEffect, useState } from "react";

const LocationInput = ({ attendeeLocation, onLocationChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [barangay, setBarangay] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    onLocationChange(selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    if (attendeeLocation) {
      setSelectedLocation(attendeeLocation);
    } else {
      setSelectedLocation("");
    }
    // if (
    //   // attendeeLocation !== undefined ||
    //   attendeeLocation !== "null, null, null, null"
    // ) {
    //   setSelectedLocation(attendeeLocation);
    // } else {
    //   setSelectedLocation("");
    // }
  }, [attendeeLocation]);

  const toggleDropdown = async () => {
    setIsDropdownOpen((prev) => !prev);
    try {
      const response = await fetch(
        "https://psgc.gitlab.io/api/island-groups.json"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationSelect = async (location, event) => {
    event.preventDefault();
    localStorage.setItem("region", location.name);
    setSelectedLocation(location.name);
    try {
      const response = await fetch(
        `https://psgc.gitlab.io/api/island-groups/${location.code}/provinces.json`
      );
      const data = await response.json();
      setProvince(data);
      setData([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvince = async (location, event) => {
    event.preventDefault();
    localStorage.setItem("province", location.name);
    setSelectedLocation((prev) => prev + ", " + location.name);
    try {
      const response = await fetch(
        `https://psgc.gitlab.io/api/provinces/${location.code}/cities-municipalities.json`
      );
      const data = await response.json();
      const sort = data.sort((a, b) => a.name.localeCompare(b.name));
      setCity(sort);
      setProvince([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCity = async (location, event) => {
    event.preventDefault();
    localStorage.setItem("city", location.name);
    setSelectedLocation((prev) => prev + "," + location.name);
    try {
      const response = await fetch(
        `https://psgc.gitlab.io/api/cities-municipalities/${location.code}/barangays.json`
      );
      const data = await response.json();
      const sort = data.sort((a, b) => a.name.localeCompare(b.name));
      setBarangay(sort);
      setCity([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBarangay = async (location, event) => {
    event.preventDefault();
    localStorage.setItem("barangay", location.name);
    setIsDropdownOpen(false);
    setSelectedLocation((prev) => prev + ", " + location.name);
    setBarangay([]);
  };

  const handleClear = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://psgc.gitlab.io/api/island-groups.json"
      );
      const data = await response.json();
      setData(data);
      setBarangay([]);
      setCity([]);
      setProvince([]);
      setSelectedLocation("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Region, Province, City, Barangay"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left inline-flex items-center"
          onClick={toggleDropdown}
          readOnly
          value={selectedLocation}
        />
        <svg
          className="w-2.5 h-2.5 absolute right-3 top-1/2 transform -translate-y-1/2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>

      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } w-full  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <div className="flex justify-between lg:px-10 py-2">
          <li
            className={`cursor-pointer text-md list-none ${
              data.length >= 1
                ? "border-2 border-b-[#f87a58] border-transparent "
                : ""
            } font-semibold text-gray-700 dark:text-gray-200`}
            onClick={(event) => handleClear(event)}
          >
            Region
          </li>
          <li
            className={` text-md list-none ${
              province.length >= 1
                ? "border-2 border-b-[#f87a58] border-transparent "
                : ""
            } cursor-not-allowed disabled font-semibold text-gray-700 dark:text-gray-200`}
          >
            Province
          </li>
          <li
            className={` text-md list-none ${
              city.length >= 1
                ? "border-2 border-b-[#f87a58] border-transparent "
                : ""
            } cursor-not-allowed disabled font-semibold text-gray-700 dark:text-gray-200`}
          >
            City
          </li>
          <li
            className={` text-md list-none ${
              barangay.length >= 1
                ? "border-2 border-b-[#f87a58] border-transparent "
                : ""
            } cursor-not-allowed disabled font-semibold text-gray-700 dark:text-gray-200`}
          >
            Barangay
          </li>
        </div>
        <ul
          className="py-2 text-sm overflow-y-auto h-[200px] text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {data.map((location, index) => (
            <li key={index}>
              <a
                href="#"
                className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(event) => handleLocationSelect(location, event)}
              >
                {location.name}
              </a>
            </li>
          ))}
          {province.map((location, index) => (
            <li key={index}>
              <a
                href="#"
                className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(event) => handleProvince(location, event)}
              >
                {location.name}
              </a>
            </li>
          ))}
          {city.map((location, index) => (
            <li key={index}>
              <a
                href="#"
                className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(event) => handleCity(location, event)}
              >
                {location.name}
              </a>
            </li>
          ))}
          {barangay.map((location, index) => (
            <li key={index}>
              <a
                href="#"
                className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(event) => handleBarangay(location, event)}
              >
                {location.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationInput;
