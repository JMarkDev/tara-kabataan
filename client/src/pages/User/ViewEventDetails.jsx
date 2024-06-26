import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useFormat } from "../../hooks/useFormatDate";
import FeatureImageGallery from "../../components/FeaturedImageGallery";
import JoinEvent from "./JoinEvent";
import Cookies from "js-cookie";
import { useToast } from "../../hooks/useToast";
import BackBtn from "../../components/BackBtn";
import { motion } from "framer-motion";
import Comments from "../../components/Comments";

const ViewEventDetails = () => {
  const toast = useToast();
  const { id } = useParams();
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [discountDate, setDiscountDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const { extractYear, dateFormat, formatTime, discountedPrice } = useFormat();
  const event_date = `${extractYear(startDate)} - ${dateFormat(endDate)}`;
  const [comment, setComment] = useState([]);
  const [allowedComment, setAllowedComment] = useState(false);
  const [formData, setFormData] = useState({
    event_id: id,
    user_id: userId,
    event_name: title,
    attendees_name: fullName,
    comment: "",
    image: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          setFullname(`${response.data.firstname} ${response.data.lastname}`);
          setProfileImage(response.data.image);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await api.get(`/event/id/${id}`);
        const {
          image,
          event_title,
          start_time,
          end_time,
          location,
          start_date,
          end_date,
          event_description,
          organizer_name,
          event_type,
          event_category,
          price,
          discountDate,
          discount,
          status,
        } = response.data;
        setImage(image);
        setTitle(event_title);
        setStartTime(start_time);
        setEndTime(end_time);
        setLocation(location);
        setStartDate(start_date);
        setEndDate(end_date);
        setDescription(event_description.replace(/\n/g, "<br>"));
        setOrganizer(organizer_name);
        setEventType(event_type);
        setEventCategory(event_category);
        setPrice(price);
        const parseDiscount = JSON.parse(discount);
        setDiscountDate(new Date(parseDiscount.discount_date));
        setDiscount(parseDiscount.discount_price);
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    };
    getEventDetails();
  }, [id]);

  const handleClose = () => {
    setModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files : value,
    }));
  };

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

  const handleComment = async (e) => {
    e.preventDefault();

    const { comment, image } = formData;
    const data = new FormData();

    if (image !== null) {
      for (let i = 0; i < image.length; i++) {
        data.append("image", image[i]);
      }
    }

    data.append("event_id", id);
    data.append("user_id", userId);
    data.append("event_name", title);
    data.append("attendees_name", fullName);
    data.append("comment", comment);

    try {
      const response = await api.post("/comment/add", data);
      if (response.data.status === "success") {
        setComment((prevData) => [...prevData, response.data.postcomment]);
        toast.success("Feedback submitted successfully");
        setFormData({
          comment: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const response = await api.get(`/attendees/join-events/${userId}`);
        const allowComment = response.data.map((event_id) => event_id.event_id);

        if (allowComment.includes(parseInt(id))) {
          setAllowedComment(true);
        } else {
          setAllowedComment(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJoinedEvents();
  }, [userId, id]);

  const eventPrice = (discountDate, discount, price) => {
    const discounted = discountedPrice(discountDate);

    if (discounted) {
      const discountedPrice = price - discount;
      return discountedPrice;
    } else {
      return price;
    }
  };

  return (
    <>
      <motion.div
        className=" lg:px-20  py-10 flex flex-col-2 md:flex-row flex-col gap-5"
        initial={{
          opacity: 0,
          x: -50,
          // x: index % 2 === 0 ? 50 : -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: true }}
      >
        <div className="relative w-full bg-gray-100 p-5">
          <div className="absolute">
            <BackBtn />
          </div>

          <img
            src={`${api.defaults.baseURL}${image}`}
            alt=""
            className="w-full md:h-[400px] mb-5"
          />
          <span className=" bg-green-300 w-fit px-2 py-1 rounded-full text-green-800">
            {status}
          </span>
          <h1 className="md:text-4xl text-wrap text-xl py-3 text-[#6415ff] font-bold">
            {title}
          </h1>

          <div className="">
            <div className="flex flex-col p-2 rounded-md">
              <div className="mb-5">
                <h1 className="text-xl font-bold mb-3">Date</h1>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="md:text-2xl text-lg text-[#6415ff]" />
                  <p>
                    {extractYear(startDate)} - {dateFormat(endDate)}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <h1 className="text-xl font-bold mb-3">Time</h1>
                <div className="flex items-center gap-3">
                  <IoIosTime className="md:text-2xl text-lg text-[#6415ff]" />
                  <p>
                    {formatTime(startTime)} - {formatTime(endTime)}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <h1 className="text-xl font-bold mb-3">Venue</h1>
                <div className="flex items-center gap-3">
                  <FaLocationDot className="md:text-2xl text-lg text-[#6415ff]" />
                  <p>{location}</p>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#6415ff]">
                About this event
              </h1>
              <p
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full">
          <div className="bg-gray-100 sticky top-5 p-5 rounded-md">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>Organizer</p>
                <p>{organizer}</p>
              </div>
              <div className="flex justify-between">
                <p>Event Type</p>
                <p>{eventType}</p>
              </div>
              <div className="flex justify-between">
                <p>Category</p>
                <p>{eventCategory}</p>
              </div>
              {eventType === "Registration Fee" && (
                <>
                  <div className="flex justify-between">
                    <p>Price</p>
                    <p>₱ {eventPrice(discountDate, discount, price)}</p>
                  </div>
                </>
              )}
              {status === "Upcoming" ? (
                <>
                  <div className="flex justify-between">
                    <p>Registration</p>
                    <p>Open</p>
                  </div>
                  <button
                    onClick={() => {
                      if (!userId || !role || !token) {
                        navigate("/register");
                      } else if (!allowedComment) {
                        setModal(true);
                      }
                    }}
                    className="p-2 w-full px-5 bg-blue-600 hover:bg-blue-700 text-white mt-5 rounded-full"
                  >
                    {allowedComment ? "Already Joined" : "Join Now"}
                  </button>
                  {modal && (
                    <JoinEvent
                      handleClose={handleClose}
                      eventType={eventType}
                      title={title}
                      total={eventPrice(discountDate, discount, price)}
                      event_date={event_date}
                      event_location={location}
                    />
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <p>Registration</p>
                    <p>Closed</p>
                  </div>
                  <button>
                    <p className="p-2 w-full px-5 bg-green-400 text-green-800 mt-5 rounded-full">
                      Event Completed
                    </p>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      {status === "Completed" && (
        <div className="bg-white lg:px-20 p-5">
          <FeatureImageGallery id={id} />
          <div className="bg-gray-100 p-5">
            <h1 className="font-bold text-lg md:text-2xl my-5">
              Event Feedback
            </h1>
            {allowedComment && (
              <form action="" onSubmit={handleComment}>
                <div className="flex md:flex-row flex-col">
                  <textarea
                    onChange={handleInputChange}
                    value={formData.comment}
                    name="comment"
                    required
                    className="w-full p-5 border py-2 px-2 rounded-md shallowedCommentadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                    rows="5"
                    placeholder="Tell me about your experience"
                  ></textarea>
                  <div className="p-5">
                    <input
                      type="file"
                      name="image"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      // accept="image/*"
                      onChange={handleInputChange}
                      multiple
                    />
                    <button
                      className="p-2 mt-5 w-full rounded-full bg-blue-500 hover:bg-blue-700 text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}

            <Comments comments={comment} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewEventDetails;
