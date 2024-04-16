import React from "react";
import { Link } from "react-router-dom";
import successImg from "../../assets/images/undraw_completing_re_i7ap.svg";

const SuccessJoined = () => {
  return (
    <div className="h-full  flex justify-center items-center mt-10">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg">
        <img src={successImg} alt="success" className="h-[250px]" />
        <h1 className="text-lg lg:text-4xl font-bold text-center mt-8">
          You have successfully joined the event!
        </h1>
        <p className="text-center text-gray-600 mt-4">
          We look forward to seeing you at the event. If you have any questions
          or need further information, please don't hesitate to contact us.
        </p>
        <Link
          to={"/home"}
          className="mt-8 w-fit py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default SuccessJoined;
