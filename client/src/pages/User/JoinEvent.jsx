import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Cookies from "js-cookie";
import LocationComponent from "../../components/LocationComponent";
import PhoneInput from "../../components/PhoneInput";
import { useToast } from "../../hooks/useToast";

const JoinEvent = ({
  handleClose,
  eventType,
  title,
  event_location,
  total,
  event_date,
}) => {
  const toast = useToast();
  const { id } = useParams();
  const userId = Cookies.get("userId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          const { firstname, lastname, email, gender } = response.data;
          setFirstName(firstname);
          setLastName(lastname);
          setEmail(email);
          setGender(gender);

          setPhone(response.data?.phone_number || "");
          setLocation(response.data?.location || "");

          const attendeeBirthdate = response.data?.birthdate;
          if (attendeeBirthdate) {
            const dateObj = new Date(attendeeBirthdate);

            const day = dateObj.getDate() + 1;
            const month = dateObj.getMonth() + 1;
            const year = dateObj.getFullYear();

            setDay(day);
            setMonth(month);
            setYear(year);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  const months = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      handleClose();
    }, 2000);

    const data = {
      event_id: id,
      user_id: userId,
      event_name: title,
      event_location: event_location,
      event_type: eventType,
      attendee_name: `${firstName} ${lastName}`,
      gender: gender,
      attendee_email: email,
      birthdate: `${year}-${month}-${day}`,
      phone_number: phone,
      location: location,
      payment_method: paymentMethod,
      total_amount: total,
      event_date: event_date,
    };

    console.log(data);

    try {
      const response = await api.post("/attendees/add", data);
      console.log(data);
      if (response.data.status === "success") {
        toast.success("Join event successfully!");
        localStorage.removeItem("region");
        localStorage.removeItem("province");
        localStorage.removeItem("city");
        localStorage.removeItem("barangay");
        localStorage.removeItem("phone");
      }
    } catch (error) {
      toast.error(error.response.data.Error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-xl">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Please fill out information details
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <form
                onSubmit={handleSubmit}
                action=""
                method="POST"
                encType="multipart/form-data"
              >
                <div className="mb-4 flex md:flex-row flex-col justify-between">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-bold dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      disabled
                      defaultValue={firstName}
                      className="w-full md:w-[250px] border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-4 md:mt-0">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-bold dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      disabled
                      defaultValue={lastName}
                      className="w-full md:w-[250px] border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled
                    defaultValue={email}
                    className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2 mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Gender
                  </label>
                  <div className="flex items-start">
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        // disabled
                        onChange={() => setGender("Male")}
                        checked={gender === "Male"}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        // disabled
                        checked={gender === "Female"}
                        onChange={() => setGender("Female")}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center ml-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Non-Binary"
                        // disabled
                        checked={gender === "Non-binary"}
                        onChange={() => setGender("Non-binary")}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Date of birth
                  </label>
                  <div className="flex gap-5">
                    <select
                      id="day"
                      name="day"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      required
                      className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Day</option>
                      {/* Generate day options */}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day + 1}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                    <select
                      id="month"
                      name="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      required
                      className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Month</option>
                      {/* Generate month options */}
                      {months.map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      id="year"
                      name="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                      className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Year</option>
                      {/* Generate year options */}
                      {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Phone Number
                  </label>
                  <div className="">
                    <PhoneInput
                      attendeePhone={phone}
                      onPhoneChange={handlePhoneChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Location
                  </label>
                  <LocationComponent
                    attendeeLocation={location}
                    onLocationChange={handleLocationChange}
                  />
                </div>
                <div className="mb-4 w-full">
                  {eventType !== "Free" && (
                    <>
                      <label
                        htmlFor="title"
                        className="block text-gray-700 font-bold dark:text-white"
                      >
                        Payment Method
                      </label>
                      <div className="relative">
                        <select
                          name="payment"
                          id="payment"
                          value={paymentMethod}
                          required
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Payment Method</option>
                          <option value="Cash">Cash</option>
                          <option value="Gcash">Gcash</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 12L3 6h14l-7 6z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end pt-5">
                  <button
                    onClick={handleClose}
                    className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinEvent;
