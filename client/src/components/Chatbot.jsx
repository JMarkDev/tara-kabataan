import React, { useEffect, useRef, useState } from "react";
import ChatbotIMG from ".././assets/images/pngegg.png";
import CrossIcon from ".././assets/images/cross.png";
import { FiSend } from "react-icons/fi";
import api from "../api/api";
import Loading from "../components/loading/loadingBall";

const Chatbot = ({ setOpenChat, openChat }) => {
  const [userQuery, setUserQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainer = useRef(null);
  const option = ["event registration", "payment", "contact us", "discount"];

  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserQuery("");
    try {
      if (userQuery === "") return;
      const response = await api.post("/chatbot/query", {
        user_query: userQuery,
      });
      const updatedConversation = [
        ...conversation,
        { user_query: userQuery, bot_response: response.data.data },
      ];
      setIsLoading(!isLoading);
      setConversation(updatedConversation);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = async (option) => {
    setUserQuery(option);
    try {
      const response = await api.post("/chatbot/query", {
        user_query: option,
      });
      const updatedConversation = [
        ...conversation,
        { user_query: option, bot_response: response.data.data },
      ];
      setIsLoading(!isLoading);
      setConversation(updatedConversation);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const formatResponse = (response) => {
    return response.replace(/\n/g, "<br>");
  };

  return (
    <div className="bg-[#f2f2f2] h-[450px] transition-all shadow-2xl drop-shadow-xl w-[370px] fixed  bottom-[90px] rounded-lg right-5">
      <div className="flex bg-[#5e35af] p-1 rounded-t-lg justify-between">
        <div className="flex">
          <img
            src={ChatbotIMG}
            alt="chatbot"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm text-white p-3 rounded-t-lg ">
            Event Management Chatbot
          </p>
        </div>
        <div className="">
          <img
            onClick={() => setOpenChat(!openChat)}
            className="w-6 invert m-1 cursor-pointer"
            src={CrossIcon}
            alt="cross"
          />
        </div>
      </div>
      <div className="h-[280px] pb-2 overflow-y-auto " ref={chatContainer}>
        <div className="flex flex-col gap-2 mt-7 mx-3">
          <div className="flex gap-2">
            <img
              src={ChatbotIMG}
              alt="chatbot"
              className="w-7 h-7 rounded-full"
            />
            <p className="text-sm rounded-lg p-2 mr-8 bg-gray-300 py-3 transition-all ">
              Welcome to our Chatbot! How can I assist you today?
            </p>
          </div>
          {conversation.map((convo, index) => {
            const lastItem = index === conversation.length - 1;
            return (
              <div key={index}>
                <div className="mr-3 flex justify-end">
                  <p className="text-sm ml-12 my-2 p-2 rounded-lg bg-slate-500 text-white">
                    {convo.user_query}
                  </p>
                </div>
                <div className="flex gap-2">
                  <img
                    src={ChatbotIMG}
                    alt="chatbot"
                    className="w-7 h-7 rounded-full"
                  />
                  <div className="flex items-center">
                    {lastItem && isLoading ? (
                      <Loading />
                    ) : (
                      <p
                        className="text-sm rounded-lg p-2 mr-8 bg-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: formatResponse(convo.bot_response),
                        }}
                      ></p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex px-1 gap-1 flex-wrap">
        {option.map((options, index) => (
          <div
            key={index}
            className="text-sm px-2 py-1 hover:bg-[#6415ff] hover:text-white border border-[#6415ff] rounded-full  text-[#6415ff] cursor-pointer transition-all"
            onClick={() => handleOptionClick(options)}
          >
            {options}
          </div>
        ))}
      </div>
      <div className="absolute rounded-b-lg bg-[#f2f2f2] left-0 bottom-0 w-full px-3">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex relative flex-row-reverse justify-center items-center">
            <FiSend
              onClick={handleSubmit}
              className="text-xl text-[#6415ff] cursor-pointer absolute z-10 bottom-4 right-3"
            />
            <input
              type="text"
              className="relative w-full mb-2 p-2 rounded-full text-sm focus:outline-none border border-indigo-400 focus:border-[#6415ff]"
              placeholder="Type a message"
              // value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </div>
        </form>
        <p className="text-sm p-1 flex justify-center text-gray-600">
          @tarakabataan{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
