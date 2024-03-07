import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useToast } from "../../../hooks/useToast";

const EditEvent = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [eventType, setEventType] = useState(false);
  const [formData, setFormData] = useState({
    event_title: "",
    event_description: "",
    image: null,
    organizer_name: "",
    event_type: eventType,
    event_category: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: "",
    attendance_count: "",
    price: "00",
    discount: "00",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files : value,
    }));
  };

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, event_category: selectedCategory });
  };

  useEffect(() => {
    const fetchEvent = async () => {
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
        setFormData((prevData) => ({
          ...prevData,
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
        }));

        if (response.data.event_type === "Registration Fee") {
          setEventType(true);
        } else {
          setEventType(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const {
      image,
      event_title,
      event_description,
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
    } = formData;
    const data = new FormData();

    for (let i = 0; i < image.length; i++) {
      data.append("image", image[i]);
    }

    data.append("event_title", event_title);
    data.append("event_description", event_description);
    data.append("organizer_name", organizer_name);
    data.append("event_type", event_type);
    data.append("event_category", event_category);
    data.append("start_date", start_date);
    data.append("end_date", end_date);
    data.append("start_time", start_time);
    data.append("end_time", end_time);
    data.append("location", location);
    data.append("attendance_count", attendance_count);
    data.append("price", price);
    data.append("discount", discount);

    try {
      const response = await api.put(`/event/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === "success") {
        toast.success("Event updated successfully");
        navigate("/admin-events");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category/all");
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mt-4 dark:text-white  ">
        Update Event Information{" "}
      </h2>
      <form
        onSubmit={handleUpdateEvent}
        method="PUT"
        encType="multipart/form-data"
        className="mt-4"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="event_title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.event_title}
            onChange={(e) =>
              setFormData({ ...formData, event_title: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold dark:text-white"
          >
            Organizer
          </label>
          <input
            type="text"
            id="organizer_name"
            name="organizer_name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.organizer_name}
            onChange={(e) =>
              setFormData({ ...formData, organizer_name: e.target.value })
            }
          />
        </div>
        <div className="mb-4 dark:text-white">
          <label
            htmlFor="image"
            className="block text-gray-700 font-bold dark:text-white "
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none text-center"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-white font-bold "
          >
            Description
          </label>
          <textarea
            id="description"
            name="event_description"
            rows="6"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.event_description}
            onChange={(e) =>
              setFormData({ ...formData, event_description: e.target.value })
            }
          />
        </div>
        <div className="lg:flex justify-between gap-3">
          <div className={`mb-4 w-full ${eventType && "lg:w-[50%]"}`}>
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              Type
            </label>
            <select
              name="event_type"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              id=""
              required
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "Registration Fee") {
                  setEventType(true);
                } else {
                  setEventType(false);
                  formData.attendance_count = "0";
                  formData.price = "00";
                  formData.discount = "00";
                }
              }}
              value={formData.event_type}
            >
              <option value="">Select Event Type</option>
              <option value="Free">Free</option>
              <option value="Registration Fee">Registration Fee</option>
            </select>
          </div>
          {eventType && (
            <div className="mb-4 w-full lg:w-[50%]">
              <label
                htmlFor="attendance"
                className="block text-gray-700 dark:text-white font-bold "
              >
                Attendance Count For Discount
              </label>
              <input
                type="number"
                id="attendance_count"
                name="attendance_count"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={formData.attendance_count}
                onChange={(e) =>
                  setFormData({ ...formData, attendance_count: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {eventType && (
          <div className="lg:flex justify-between gap-3">
            <div className="mb-4 w-full lg:w-[50%]">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={eventType ? formData.price : "00"}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="mb-4 w-full lg:w-[50%]">
              <label
                htmlFor="discount"
                className="block text-gray-700 font-bold dark:text-white"
              >
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                required
                value={eventType ? formData.discount : "00"}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold dark:text-white"
          >
            Category
          </label>
          <select
            required
            onChange={handleCategory}
            value={formData.event_category}
            name="event_category"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            id=""
          >
            <option value="" className="">
              Select Event Category
            </option>
            {category.map(({ id, category_name }) => {
              return (
                <option key={id} value={category_name}>
                  {category_name}
                </option>
              );
            })}
            {/* <option value="Conference">Conference</option>
              <option value="Seminar">Seminar</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Training">Training</option>
              <option value="Meeting">Meeting</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Symposium">Symposium</option>
              <option value="Networking-event">Networking Event</option>
              <option value="Summit">Summit</option>
              <option value="Online-event">Online Event</option> */}
          </select>
        </div>

        <div className="lg:flex justify-between gap-3">
          <div className="mb-4 w-full lg:w-[50%]">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </div>
          <div className="mb-4 w-full lg:w-[50%]">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </div>
        </div>
        <div className="lg:flex justify-between gap-3">
          <div className="mb-4 w-full lg:w-[50%]">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              Start Time
            </label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
            />
          </div>
          <div className="mb-4 w-full lg:w-[50%]">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              End Time
            </label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold dark:text-white"
          >
            Venue
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        {/* <div className='mb-4'>
          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
            Location
          </label>
          <LocationComponent />
        </div> */}
        <div className="flex justify-end">
          <Link
            to="/admin-events"
            className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
