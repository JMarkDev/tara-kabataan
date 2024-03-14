import React, { useEffect, useState } from "react";
import PhoneInput from "../../components/PhoneInput";
import LocationComponent from "../../components/LocationComponent";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/api";
import { useToast } from "../../hooks/useToast";

const EditProfile = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [firstnameError, setfirstnameError] = useState("");
  const [LastnameError, setLastnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/id/${userId}`);
        const { firstname, lastname, email, gender, phone_number, location } =
          response.data;

        setFirstName(firstname);
        setLastname(lastname);
        setEmail(email);
        setGender(gender);
        setPhone(phone_number);
        setLocation(location);

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
  };

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

    const data = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      password: password,
      confirmPassword: confirmPassword,
      birthdate: `${year}-${month}-${day}`,
      phone_number: phone,
      location: location,
    };

    try {
      console.log(data);
      const response = await api.put(
        `/user/update-user-profile/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" m-auto p-4 w-full max-w-xl">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              Update Profile
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <form action="" onSubmit={handleSubmit} method="PUT">
              <div className="flex justify-between gap-5">
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="mt-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      errorMessage ? "border-red-600" : ""
                    }`}
                  />
                  {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="mt-2 block text-sm font-medium text-gray-700 "
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      errorMessage ? "border-red-600" : ""
                    }`}
                  />
                  {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                </div>
              </div>

              <div className="mt-2">
                <div className="flex">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Email
                  </label>
                  <span className="text-sm text-[#9E9E9E] mx-2">|</span>
                  <Link
                    to={`/update-email/${userId}`}
                    // type="button"  // add type button to prevent form submission
                    className="text-sm text-[#1A9CB7]"
                    // onClick={() =>
                    // handleChangeUsername()}
                  >
                    Change
                  </Link>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-gray-900 dark:text-white py-2">{email}</p>
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="title"
                  className="mt-2 block text-sm font-medium text-gray-700 "
                >
                  Gender
                </label>
                <div className="flex items-start">
                  <label className="inline-flex items-center mt-2 mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center mt-2 ml-3">
                    <input
                      type="radio"
                      name="gender"
                      value="Non-Binary"
                      checked={gender === "Non-Binary"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">Non-binary</span>
                  </label>
                </div>
                {/* <div className="h-4">  */}
                {genderError && (
                  <div className="text-red-600 text-sm">{genderError}</div>
                )}
                {/* </div> */}
                <div className="mb-4 mt-2">
                  <label
                    htmlFor="title"
                    className="mt-2 block text-sm font-medium text-gray-700 "
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    attendeePhone={phone}
                    onPhoneChange={handlePhoneChange}
                  />
                  {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mt-2 block text-sm font-medium text-gray-700 "
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
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day + 1}>
                        {day}
                      </option>
                    ))}
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
                  className="mt-2 block text-sm font-medium text-gray-700 "
                >
                  Location
                </label>
                <LocationComponent
                  attendeeLocation={location}
                  onLocationChange={handleLocationChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mt-2 block text-sm font-medium text-gray-700 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="passord"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errorMessage ? "border-red-600" : ""
                  }`}
                />
                {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mt-2 block text-sm font-medium text-gray-700 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="confirm_password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errorMessage ? "border-red-600" : ""
                  }`}
                />
                {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
              </div>

              <div className="flex justify-end mt-5">
                <Link
                  to={"/profile"}
                  //   onClick={handleClose}
                  className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* )} */}
    </>
  );
};

export default EditProfile;
