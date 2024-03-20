import React from "react";
import userIcon from "../assets/images/user.png";

const Notification = () => {
  return (
    <>
      <div className="absolute top-[60px] right-5 mr-[-10px] ">
        <div className="bg-white rounded-lg border h-[450px] w-[320px] absolute  z-20 right-2 overflow-y-auto">
          <h1 className="text-md pl-3 font-semibold border-b border-gray-300 py-2">
            Notifications
          </h1>
          <ul className="w-full">
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                {/* sample notifications */}
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Josiel Mark Cute</p>
                  <p>Joined Sample event name hahahah</p>
                  <p className="text-xs ">
                    Jan 01, 2021 - <span>02:25 PM</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="gap-2 text-sm text-gray-600 flex pl-3 items-center  p-2   cursor-pointer
                      hover:bg-gray-200 border-b border-gray-300 dark:hover:bg-gray-20 "
              >
                <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-bold">Sample event name hahahah</p>
                  <p className="text-xs ">Jan 01, 2021</p>
                  <button>Click to upload photos</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notification;
