import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useFormat } from "../hooks/useFormatDate";
import userIcon from "../assets/images/user.png";
import Cookies from "js-cookie";
import { FaReplyAll } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToast } from "../hooks/useToast";
import { useParams } from "react-router-dom";

const CommentContainer = ({ comments }) => {
  const userRole = Cookies.get("role");
  const userId = Cookies.get("userId");
  const { id } = useParams();
  const { dateFormat } = useFormat();
  const [reply, setActiveReply] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentID, setCommentID] = useState("");
  const [formData, setFormData] = useState({
    event_id: id,
    user_id: userId,
    comment: "",
    comment_id: commentID,
    image: null,
    role: "admin",
  });

  useEffect(() => {
    setCommentData(comments);
  }, [comments]);

  const toast = useToast();
  // Create an object to store comments grouped by comment_id
  const commentGroups = {};

  // Group comments by comment_id
  commentData.forEach((comment) => {
    const { comment_id } = comment;
    if (!commentGroups[comment_id]) {
      commentGroups[comment_id] = [];
    }
    commentGroups[comment_id].push(comment);
  });

  // Convert the commentGroups object into an array of arrays
  const groupedComments = Object.values(commentGroups);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/comment/delete/${id}`);
      if (response.data.status === "success") {
        toast.success("Comment deleted successfully!");
      }
      const filterComments = comments.filter((comment) => comment.id !== id);
      setCommentData(filterComments);
    } catch (error) {
      console.log(error);
    }
  };

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
    data.append("comment", comment);
    data.append("comment_id", commentID);

    try {
      const response = await api.post("/comment/reply", data);
      if (response.data.status === "success") {
        setCommentData((prevData) => [...prevData, response.data.postcomment]);
        toast.success("Feedback submitted successfully");
        setActiveReply(false);
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files : value,
    }));
  };

  const handleReplyModal = (active, comment_id) => {
    setActiveReply(active);
    setCommentID(comment_id);
  };

  return (
    <div>
      {groupedComments.length > 0 ? (
        groupedComments.map((group, index) => (
          <div key={index} className="bg-white  rounded-lg">
            {group.map(
              ({
                id,
                attendees_name,
                created_at,
                image,
                comment,
                user,
                role,
                comment_id,
              }) => (
                <div
                  key={id}
                  className={`${
                    role === "admin" ? "ml-20" : ""
                  } flex justify-between gap-3 my-5 border-b-gray-300 border-b p-5 rounded-md `}
                >
                  <div className="flex gap-3 bg-white">
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
                      <div>
                        <p className="font-bold">
                          {role === "user" ? attendees_name : "Admin response:"}
                        </p>
                        <p className="text-sm">{dateFormat(created_at)}</p>
                        <p className="mt-5">{comment}</p>
                        {/* Handle different image formats */}
                        {image && (
                          <div className="flex gap-2 mt-5 overflow-x-auto">
                            {typeof image === "string"
                              ? image
                                  .split(",")
                                  .map((imageUrl, index) => (
                                    <img
                                      key={`${id}-${index}-${imageUrl.trim()}`}
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
                                    key={`${id}-${index}-${imageUrl}`}
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
                  </div>

                  <div className="flex items-start ">
                    <div className="flex flex-col md:flex-row gap-2">
                      {userRole === "admin" && (
                        <>
                          <button
                            onClick={() => handleReplyModal(true, comment_id)}
                            className="flex justify-center items-center gap-2 bg-gray-300 rounded-md p-2 hover:bg-gray-400"
                          >
                            {" "}
                            <FaReplyAll />
                            Reply
                          </button>

                          {reply && (
                            <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
                              <div className="relative p-4 w-full max-w-lg">
                                <div className="relative bg-white rounded-lg shadow">
                                  <div className="flex items-center justify-between p-4 border-b rounded-t ">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      Reply Comment
                                    </h3>
                                    <button
                                      onClick={() => setActiveReply(false)}
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>
                                  <div className="p-4 space-y-4">
                                    <form action="" onSubmit={handleComment}>
                                      <div className=" flex flex-col">
                                        <textarea
                                          onChange={handleInputChange}
                                          value={formData.comment}
                                          name="comment"
                                          required
                                          className="w-full p-5 border py-2 px-2 rounded-md shallowedCommentadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                                          rows="5"
                                          placeholder="Type reply here..."
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
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => handleDelete(id)}
                            className="flex items-center  text-red-500 bg-gray-300 rounded-md p-2 hover:bg-gray-400"
                          >
                            <MdDelete />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ))
      ) : (
        <p className="my-5">There are no reviews for this event yet</p>
      )}
    </div>
  );
};

export default CommentContainer;
