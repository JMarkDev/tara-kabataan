import React, { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { useFormat } from "../hooks/useFormatDate";
import imgNotify from "../assets/images/undraw_notify_re_65on.svg";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  const { dateFormat, formatTime, extractYear } = useFormat();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const discountPrice = (discount_date, discount_price, price) => {
    const date = new Date();
    const discountDate = new Date(discount_date);

    if (discountDate <= date) {
      const discountedPrice = (
        ((price - discount_price) / price) * 100 -
        100
      ).toFixed(2);
      return `${discountedPrice} %`;
    } else {
      return null;
    }
  };

  const eventPrice = (discount_date, discount_price, price) => {
    const date = new Date();
    const discountDate = new Date(discount_date);

    if (discountDate <= date) {
      return (
        <>
          <p className="line-through text-gray-600">₱ {price}</p>
          <p className="text-black ">₱{price - discount_price}.00</p>
        </>
      );
    } else {
      return <p className="text-black ">₱{price}</p>;
    }
  };

  return (
    <div>
      {event.length === 0 ? (
        <div className="flex flex-col justify-center w-full">
          <h1 className="lg:text-4xl font-bold">No Events Available</h1>
          <img src={imgNotify} alt="empty" className="h-[50vh] mt-5" />
        </div>
      ) : (
        <div className="lg:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {event.map(
            (
              {
                id,
                event_title,
                event_category,
                image,
                start_date,
                end_date,
                start_time,
                end_time,
                price,
                discount,
                event_type,
              },
              index
            ) => (
              <motion.div
                key={id}
                className="max-w-sm h-fit bg-white cursor-pointer rounded-md shadow-md hover:shadow-2xl"
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
                <div className="relative">
                  <p
                    className={`${
                      discount.discount_price !== "00" &&
                      discountPrice(
                        discount.discount_date,
                        discount.discount_price,
                        price
                      )
                        ? "bg-[#ffe97a]"
                        : "hidden"
                    } rounded-bl-lg text-[#ec3814] py-2 px-2 shadow-md absolute right-0`}
                  >
                    {discountPrice(
                      discount.discount_date,
                      discount.discount_price,
                      price
                    )}
                  </p>
                </div>

                <Link to={`/event/${id}`} className="text-decoration-none">
                  <img
                    src={`${api.defaults.baseURL}${image}`}
                    alt={event_title}
                    className="w-full h-[250px] object-cover"
                  />
                </Link>

                <div className="p-3">
                  <p className="bg-[#f6f6f6] text-[#6415ff] text-md px-5 w-fit rounded-full">
                    {event_category}
                  </p>
                  <h1 className="text-[#243e63] text-xl font-bold mt-3">
                    {truncateText(event_title, 28)}
                  </h1>
                  <p className="text-[15px]">
                    Date: {extractYear(start_date)} - {dateFormat(end_date)}
                  </p>
                  <p className="text-[15px]">
                    Time: {formatTime(start_time)} - {formatTime(end_time)}
                  </p>
                  <div className="flex justify-between items-center">
                    {event_type === "Free" ? (
                      <p className="text-lg py-2">Free</p>
                    ) : (
                      <div className="py-2 flex items-center justify-between gap-5 text-lg">
                        <div className="flex gap-5">
                          {eventPrice(
                            discount.discount_date,
                            discount.discount_price,
                            price
                          )}
                        </div>
                      </div>
                    )}
                    <Link
                      to={`/event/${id}`}
                      className="bg-[#854ef3] rounded-lg px-5 py-3 text-sm text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;
