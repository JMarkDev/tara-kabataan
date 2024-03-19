import React from "react";

const Notification = () => {
  return (
    <>
      <div className="absolute top-[60px] right-5 mr-[-10px]">
        <div className="bg-white rounded-lg border h-[120px] w-[300px] absolute bottom-[-100px] z-20 right-2">
          <h1 className="text-md pl-3 font-semibold border-b border-gray-300 py-2">
            Notifications
          </h1>
          <ul className="w-full">
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2  cursor-pointer
                      hover:bg-gray-200 border-b-2 border-transparent dark:hover:bg-gray-20 "
              >
                sample notifications
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notification;
