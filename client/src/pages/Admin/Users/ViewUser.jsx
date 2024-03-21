import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormat } from "../../../hooks/useFormatDate";
import { AiOutlineUser } from "react-icons/ai";
import api from "../../../api/api";
import Cookies from "js-cookie";
import BackBtn from "../../../components/BackBtn";

const ViewUser = () => {
  const userId = useParams();
  const role = Cookies.get("role");
  const { dateFormat } = useFormat();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [birthdate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joinEvents, setJoinEvents] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId.id}`);
          const { firstname, lastname, email, gender, image } = response.data;
          setName(`${firstname} ${lastname}`);
          setEmail(email);
          setGender(gender);
          setImage(image);
          setBirthDate(response.data?.birthdate);
          setLocation(response.data?.location);
          setPhoneNumber(response.data?.phone_number);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId, image]);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        if (userId) {
          const response = await api.get(`/attendees/join-events/${userId.id}`);
          setJoinEvents(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJoinedEvents();
  }, [userId]);

  return (
    <>
      <div className=" flex flex-col md:flex-row gap-5">
        <div className="w-full bg-gray-100">
          <div className="mb-5 flex items-center">
            <BackBtn />
            <h1 className="font-bold text-xl md:text-2xl text-[#243e63]">
              Personal details
            </h1>
          </div>

          <div className="p-5 max-w-lg md:m-auto text-gray-500 bg-gray-200 rounded-lg">
            <div className="flex flex-col items-center justify-center mb-5">
              <div className="flex flex-col items-center  justify-center mb-5">
                <label htmlFor="image-upload" className="cursor-pointer">
                  {image ? (
                    <img
                      src={`${api.defaults.baseURL}${image}`}
                      className="h-[100px] w-[100px] rounded-full bg-gray-400 mb-2"
                      alt="Uploaded Profile"
                    />
                  ) : (
                    <AiOutlineUser className="h-[100px] w-[100px] rounded-full bg-gray-400 mb-2" />
                  )}
                </label>
                <input
                  id="image-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold">Name:</p>
              <p>{name}</p>
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold">Email:</p>
              <p>{email}</p>
            </div>
            <div className="mb-5 flex flex-col md:flex-row justify-between">
              <p className="font-semibold">Gender:</p>
              <div className="flex gap-4">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
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
                    checked={gender === "Non-Binary"}
                    onChange={() => setGender("Non-binary")}
                    className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">Non-binary</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold">Birth Date:</p>
              <p>{birthdate ? dateFormat(birthdate) : null}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-5">
              <p className="font-semibold">Location:</p>
              <p>{location}</p>
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold">Phone Number:</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
          {joinEvents.length > 0 && (
            <>
              <h1 className="mt-10 font-bold text-xl md:text-2xl text-[#243e63] mb-5">
                Joined Events
              </h1>
              <div className="max-w-full overflow-x-auto">
                <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 py-4">
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Event Name</p>
                  </div>
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Event Location</p>
                  </div>
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Payment Method</p>
                  </div>

                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Registration Fee</p>
                  </div>
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Date</p>
                  </div>
                </div>
                {joinEvents.map(
                  ({
                    id,
                    event_name,
                    event_location,
                    // location,
                    total_amount,
                    event_date,
                    event_type,
                    payment_method,
                    event_id,
                  }) => (
                    <Link
                      to={`${
                        role === "admin"
                          ? `/view-event/${event_id}`
                          : `/event/${event_id} `
                      }`}
                      key={event_id}
                    >
                      <div className="flex flex-col md:flex-row border-b border-gray-300 dark:border-gray-700 py-4">
                        <div className="w-full md:w-1/4 px-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {event_name}
                          </p>
                        </div>
                        <div className="w-full md:w-1/4 px-4">
                          <p className="text-gray-700 text-no-wrap dark:text-gray-400">
                            {event_location}
                          </p>
                        </div>
                        <div className="w-full md:w-1/4 px-4">
                          <p className="text-gray-700 dark:text-gray-400">
                            {payment_method}
                          </p>
                        </div>
                        <div className="w-full md:w-1/4 px-4">
                          <p className="text-gray-700 dark:text-gray-400">
                            {event_type === "Free"
                              ? "Free"
                              : `₱ ${total_amount}`}
                          </p>
                        </div>
                        <div className="w-full md:w-1/4 px-4">
                          <p className="text-gray-700 dark:text-gray-400">
                            {event_date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewUser;
