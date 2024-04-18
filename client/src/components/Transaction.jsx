import React, { useEffect, useState } from "react";
import api from "../api/api";

const Transaction = ({ handleClose, user_id, event_id }) => {
  const [transactionID, setTransactionID] = useState("");
  const [userID, setUserID] = useState(user_id);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await api.get(
          `/payment/trasaction/${user_id}/${event_id}`
        );
        const {
          transaction_id,
          //   user_id,
          email_address,
          amount,
          status,
          created_at,
        } = response.data[0];

        setTransactionID(transaction_id);
        setEmail(email_address);
        setAmount(amount);
        setStatus(status);
        setDate(created_at);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTransaction();
  }, [user_id, event_id]);
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-xl">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              Transaction History
            </h3>
            <button
              type="button"
              onClick={() => handleClose(false)}
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between ">
              <h1 className="font-bold">Transaction ID</h1>
              <p>{transactionID}</p>
            </div>
            <div className="flex justify-between ">
              <h1 className="font-bold">User ID</h1>
              <p>{user_id}</p>
            </div>
            <div className="flex justify-between ">
              <h1 className="font-bold">Email Address</h1>
              <p>{email}</p>
            </div>
            <div className="flex justify-between ">
              <h1 className="font-bold">Amount</h1>
              <p>{amount}</p>
            </div>
            <div className="flex justify-between  ">
              <h1 className="font-bold">Status</h1>
              <p>{status}</p>
            </div>
            <div className="flex justify-between ">
              <h1 className="font-bold">Date</h1>
              <p>{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
