import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import PieChart from "../../../components/PieChart";
import AttendeesTable from "../../../components/AttendeesTable";
import { useFormat } from "../../../hooks/useFormatDate";
import FeaturedImageGallery from "../../../components/FeaturedImageGallery";
import BackBtn from "../../../components/BackBtn";
import userIcon from "../../../assets/images/user.png";

const ViewEvent = () => {
  const { id } = useParams();
  const [genderData, setGenderData] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [starTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [attendanceCount, setAttendanceCount] = useState("");
  const [price, setPrice] = useState("");
  const [discountDate, setDiscountDate] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [status, setStatus] = useState("");
  const { extractYear, dateFormat, formatTime } = useFormat();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchGender = async () => {
      try {
        const response = await api.get(`/analytics/gender/${id}`);

        setGenderData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGender();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/event/id/${id}`);
        const {
          event_title,
          event_description,
          image,
          organizer_name,
          event_type,
          event_category,
          start_date,
          end_date,
          start_time,
          end_time,
          location,
          attendance_count,
          price,
          discount,
          status,
        } = response.data;
        setTitle(event_title);
        setDescription(event_description.replace(/\n/g, "<br>"));
        setImage(image);
        setOrganizer(organizer_name);
        setEventType(event_type);
        setEventCategory(event_category);
        setStartDate(start_date);
        setEndDate(end_date);
        setStartTime(start_time);
        setEndTime(end_time);
        setLocation(location);
        setAttendanceCount(attendance_count);
        setPrice(price);

        const parseDiscount = JSON.parse(discount);
        setDiscountDate(parseDiscount.discount_date);
        setDiscountPrice(parseDiscount.discount_price);
        setStatus(status);
        if (event_type === "Registration Fee") {
          setDisplayPrice(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await api.get(`/attendees/event_id/${id}`);
        setAttendees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendees();
  }, [id]);

  const totalAmount = attendees.reduce((total, attendee) => {
    if (attendee.total_amount !== null || undefined) {
      return total + parseFloat(attendee.total_amount);
    } else {
      return 0;
    }
  }, 0);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comment/id/${id}`);
      setComment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div>
      <div className="flex items-center">
        <BackBtn />
        <h1 className="text-2xl font-semibold text-[#3d4465]">Event Details</h1>
      </div>
      <div className="flex my-5 gap-5 lg:flex-row flex-col justify-between">
        <div className="text-[#3d4465] lg:w-[70%] h-fit bg-white p-5 rounded-md">
          <img
            src={`${api.defaults.baseURL}${image}`}
            alt=""
            className="w-full"
          />
          <h1 className="text-xl pt-4 font-semibold ">{title}</h1>
          <h2 className="py-2">
            Organizer Name:<span className="font-bold">{organizer}</span>
          </h2>

          <p
            className="text-md "
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <div className="pt-5">
            <div className="flex flex-col gap-4  justify-between">
              <div className="flex bg-gray-200 p-2 rounded-md">
                <span className="p-4 bg-blue-200 rounded-lg">
                  <FaCalendarAlt className="text-2xl" />
                </span>
                <div className="leading-6 px-2 flex flex-col justify-center">
                  <p className="text-md font-normal">Date</p>
                  <h1 className="font-semibold">
                    {extractYear(startDate)} - {dateFormat(endDate)}
                  </h1>
                </div>
              </div>

              <div className="flex bg-gray-200 p-2 rounded-md">
                <span className="p-4 bg-blue-200 rounded-lg">
                  <IoIosTime className="text-2xl" />
                </span>
                <div className="leading-6 px-2 flex flex-col justify-center">
                  <p className="text-md font-normal">Time</p>
                  <h1 className="font-semibold">
                    {formatTime(starTime)} - {formatTime(endTime)}
                  </h1>
                </div>
              </div>

              <div className="flex bg-gray-200 p-2 rounded-md">
                <span className="p-4 bg-blue-200 rounded-lg">
                  <FaLocationDot className="text-2xl" />
                </span>
                <div className="leading-6 px-2 flex flex-col justify-center">
                  <p className="text-md font-normal">Venue</p>
                  <h1 className="font-semibold">{location}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%] p-5 bg-white h-fit text-[#3d4465]">
          <div className="flex justify-between gap-3">
            <div className="bg-gray-200 p-3 w-full rounded-md">
              <p className="text-md font-normal">Total Attendees</p>
              <h1 className="text-lg font-semibold">{attendees.length}</h1>
            </div>
            <div className="bg-gray-200 p-3 w-full rounded-md">
              <p className="text-md font-normal">Total Revenue</p>
              <h1 className="text-lg font-semibold">
                {totalAmount.toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="mt-5">
            <PieChart sampleData={genderData} />
          </div>
          <div className="mt-10">
            <h1 className="mt-3 font-semibold">
              Event Category:{" "}
              <span className="font-normal">{eventCategory}</span>
            </h1>
            <h1 className="mt-3 font-semibold">
              Event Status: <span className="font-normal">{status}</span>
            </h1>
            <h1 className="mt-3 font-semibold">
              Event Type: <span className="font-normal">{eventType}</span>
            </h1>
            {displayPrice && (
              <>
                {discountDate && (
                  <h1 className="mt-3 font-semibold">
                    Discounted Date:{" "}
                    <span className="font-normal">
                      {dateFormat(discountDate)}
                    </span>
                  </h1>
                )}

                <div className="flex justify-between gap-5">
                  <div className="w-full mt-5 bg-gray-200 p-3 rounded-md">
                    <p>Total Price</p>
                    <h1 className="font-semibold text-xl pt-2">₱ {price}</h1>
                  </div>
                  <div className="w-full mt-5 bg-gray-200 p-3 rounded-md">
                    <p>Total Discount</p>
                    <h1 className="font-semibold text-xl pt-2">
                      ₱ {discountPrice}.00
                    </h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {attendees.length === 0 ? (
        <p className="p-2 px-3 text-red-500">No attendees joined yet.</p>
      ) : (
        <div className="mt-7">
          <AttendeesTable attendees={attendees} eventType={eventType} />
        </div>
      )}
      <div className="mt-7">
        {/* <ImageGalery /> */}
        <FeaturedImageGallery id={id} />
      </div>
      <div>
        {status === "Completed" && (
          <div className="bg-white ">
            <div className="bg-gray-100 ">
              <h1 className="font-bold text-lg md:text-2xl my-5">
                Event Feedback
              </h1>

              {comment.length > 0 ? (
                <div className="bg-white mt-5 rounded-lg">
                  {comment.map(
                    ({
                      id,
                      attendees_name,
                      created_at,
                      image,
                      comment,
                      user,
                    }) => (
                      <div
                        key={attendees_name}
                        className="flex gap-3 border-b-gray-300 border-b p-5 rounded-md"
                      >
                        <img
                          src={`${
                            user && user.image
                              ? `${api.defaults.baseURL}${user.image}`
                              : userIcon
                          }`}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-bold">{attendees_name}</p>
                          <p className="text-sm">{dateFormat(created_at)}</p>
                          <p className="mt-5">{comment}</p>
                          {/* Handle different image formats */}
                          {image && (
                            <div className="flex gap-2 mt-5 overflow-x-auto">
                              {typeof image === "string"
                                ? image.split(",").map((imageUrl, index) => (
                                    <img
                                      key={`${index}-${imageUrl.trim()}`} // Combine index and trimmed URL
                                      src={`${
                                        api.defaults.baseURL
                                      }/uploads/${imageUrl.trim()}`}
                                      alt=""
                                      className="w-20 h-20"
                                    />
                                  ))
                                : image instanceof Array && image.length > 0
                                ? image.map((imageUrl, index) => (
                                    <img
                                      key={`${index}-${imageUrl}`} // Combine index and URL
                                      src={`${api.defaults.baseURL}/uploads/${imageUrl}`}
                                      alt=""
                                      className="w-20 h-20"
                                    />
                                  ))
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="my-5">There are no reviews for this event yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
