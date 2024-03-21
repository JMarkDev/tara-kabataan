import api from "../../../api/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { IoIosAddCircle } from "react-icons/io";

const AddEvent = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [eventType, setEventType] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    organizer_name: "",
    event_type: eventType,
    event_category: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: "",
    price: "00",
    discount: {
      discount_date: "",
      discount_price: "00",
    },
    status: "Upcoming",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else if (name === "discount_date" || name === "discount_price") {
      setFormData((prevData) => ({
        ...prevData,
        discount: {
          ...prevData.discount,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, event_category: selectedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      image,
      title,
      description,
      organizer_name,
      event_type,
      event_category,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
      price,
      discount,
      status,
    } = formData;
    const data = new FormData();

    // for (let i = 0; i < image.length; i++) {
    data.append("image", image[0]);
    // }

    data.append("title", title);
    data.append("description", description);
    data.append("organizer_name", organizer_name);
    data.append("event_type", event_type);
    data.append("event_category", event_category.trim());
    data.append("start_date", start_date);
    data.append("end_date", end_date);
    data.append("start_time", start_time);
    data.append("end_time", end_time);
    data.append("location", location);
    data.append("price", price);
    data.append("discount", discount);
    data.append("discount_date", discount.discount_date);
    data.append("discount_price", discount.discount_price);
    data.append("status", status);

    try {
      const response = await api.post("/event/add", data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
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
    <div className="">
      {/* <BackBtn /> */}
      <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mt-4 dark:text-white  ">
          Event Information{" "}
        </h2>
        <form
          onSubmit={handleSubmit}
          method="POST"
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
              name="title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold dark:text-white"
            >
              Organizer Name
            </label>
            <input
              type="text"
              id="organizer_name"
              name="organizer_name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.organizer_name}
              onChange={handleInputChange}
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
              name="description"
              rows="6"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              required
              value={formData.description}
              onChange={handleInputChange}
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
                    // formData.attendance_count = "0";
                    formData.price = "00";
                    formData.discount.discount_date = "";
                    formData.discount.discount_price = "00";
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
                  htmlFor="description"
                  className="block text-gray-700 dark:text-white font-bold "
                >
                  Total Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {eventType && (
            <div className="lg:flex justify-between gap-3">
              <div className="mb-4 w-full lg:w-[50%]">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold dark:text-white"
                  >
                    Discount Date
                  </label>
                  {/* <IoIosAddCircle className="text-2xl cursor-pointer bg-gray-300 hover:bg-blue-300 h-8 w-8 rounded-full p-1" /> */}
                </div>

                <input
                  type="date"
                  id="date"
                  name="discount_date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                  // required
                  value={formData.discount.discount_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 w-full lg:w-[50%]">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold dark:text-white"
                >
                  Discounte Price
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount_price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                  // required
                  value={formData.discount.discount_price}
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
