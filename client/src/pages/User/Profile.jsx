import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";
import { useFormat } from "../../hooks/useFormatDate";
import { useToast } from "../../hooks/useToast";

const Profile = () => {
  const toast = useToast();
  const userId = Cookies.get("userId");
  const { dateFormat } = useFormat();
  const [attendee, setAttendee] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [birthdate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joinEvents, setJoinEvents] = useState([]);
  const [showUpload, setShowUpload] = useState(false); // State to toggle visibility of input file

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          const { firstname, lastname, email, gender, image } = response.data;
          setName(`${firstname} ${lastname}`);
          setEmail(email);
          setGender(gender);
          setImage(image);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId, image]);

  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        if (userId) {
          const response = await api.get(`/attendees/attendee_id/${userId}`);
          if (response.data.length !== 0) {
            const { birthdate, location, phone_number } = response.data;
            setAttendee(true);
            setBirthDate(birthdate);
            setLocation(location);
            setPhoneNumber(phone_number);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendee();
  }, [userId]);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        if (userId) {
          const response = await api.get(`/attendees/join-events/${userId}`);
          setJoinEvents(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJoinedEvents();
  }, [userId]);

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setShowUpload(false); // Hide the input file after image selection

    try {
      const data = new FormData();
      data.append("image", selectedImage);
      const response = await api.put(`/user/update-profile/${userId}`, data);
      if (response.data.length === 1) {
        setTimeout(() => {
          setImage(response.data.image);
          toast.success("Profile updated successfully");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:p-20  flex flex-col md:flex-row gap-5 p-5">
        <div className="w-full p-5 bg-gray-100">
          <h1 className="font-bold text-xl md:text-2xl text-[#243e63] mb-5">
            Personal details
          </h1>
          <div className="p-5 max-w-lg md:m-auto text-gray-500 bg-gray-200 rounded-lg">
            <div className="flex flex-col items-center justify-center mb-5">
              <div className="flex flex-col items-center justify-center mb-5">
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
                  <span className="text-blue-500">
                    {image ? "Change Image" : "Upload Image"}
                  </span>
                </label>
                <input
                  id="image-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
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
                    checked={gender === "Non-binary"}
                    onChange={() => setGender("Non-binary")}
                    className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">Non-binary</span>
                </label>
              </div>
            </div>
            {attendee && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <p className="font-semibold">Birth Date:</p>
                  <p>{dateFormat(birthdate)}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-5">
                  <p className="font-semibold">Location:</p>
                  <p>{location}</p>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <p className="font-semibold">Phone Number:</p>
                  <p>+ {phoneNumber}</p>
                </div>
              </>
            )}
          </div>
          {joinEvents.length > 0 && (
            <>
              <h1 className="mt-5 font-bold text-xl md:text-2xl text-[#243e63] mb-5">
                Joined Events
              </h1>
              <div className="max-w-full overflow-x-auto">
                <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 py-4">
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Event Name</p>
                  </div>
                  <div className="w-full md:w-1/4 px-4">
                    <p className="font-medium">Location</p>
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
                    location,
                    total_amount,
                    event_date,
                    event_type,
                    event_id,
                  }) => (
                    <Link to={`/event/${event_id}`} key={event_id}>
                      <div className="flex flex-col md:flex-row border-b border-gray-300 dark:border-gray-700 py-4">
                        <div className="w-full md:w-1/4 px-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {event_name}
                          </p>
                        </div>
                        <div className="w-full md:w-1/4 px-4">
                          <p className="text-gray-700 dark:text-gray-400">
                            {location}
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

export default Profile;
