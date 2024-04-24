import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
export default function FeaturedImageGallery({ id }) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await api.get(`/archive/id/${id}`);
          setTitle(response.data?.event_name);
          const imageData = response.data?.images.split(",");
          if (typeof imageData !== "undefined") {
            imageData !== "undefined" &&
              setActive(`${api.defaults.baseURL}/uploads/${imageData[0]}`);
          }
          if (
            location.pathname === "/" ||
            location.pathname.includes("/home")
          ) {
            setData(imageData.splice(0, 5));
          } else {
            setData(imageData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleImageLink = (image) => {
    setActive(`${api.defaults.baseURL}/uploads/${image}`);
  };

  return (
    <>
      {data && (
        <>
          <div className="grid gap-4 bg-[#f6f6f6] md:p-5">
            <h1 className="py-2 font-bold text-xl text-[#243e63]">
              Event Gallery {title}
            </h1>
            <div>
              <img
                className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                src={active}
                alt=""
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {data?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    onClick={() => handleImageLink(image)}
                    src={`${api.defaults.baseURL}/uploads/${image}`}
                    className="h-20 w-full cursor-pointer rounded-lg object-cover object-center"
                    alt="gallery-image"
                  />
                  {(index === data.length - 1 && location.pathname === "/") ||
                  (index === data.length - 1 &&


                    
                    location.pathname.includes("/home")) ? (
                    <div className="absolute top-0  hover: w-full text-center flex justify-center items-center h-full">
                      <div
                        className="absolute top-0 left-0 w-full h-full bg-black/40"
                        style={{
                          backdropFilter: "blur(1px)", // Add blur effect to the overlay
                        }}
                      ></div>
                      <Link
                        to={`/event/${id}`}
                        className="text-white text-sm md:text-lg w-full z-20"
                      >
                        See more...
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
