import React, { useEffect, useRef, useState } from "react";
import api from "../api/api";
import Cookies from "js-cookie";
import { useToast } from "../hooks/useToast";

const Paypal = ({
  handlePaymentMethod,
  total,
  title,
  event_id,
  handleSubmitAttendee,
}) => {
  const toast = useToast();
  const userID = Cookies.get("userId");
  const [formData, setFormData] = useState({
    transaction_id: "",
    event_id: event_id,
    user_id: userID,
    email_address: "",
    amount: "",
    status: "",
    created_at: "",
  });
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `${title} Registration Fee`,
                amount: {
                  currency_code: "PHP",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          const updatedFormData = {
            ...formData,
            transaction_id: order.id,
            created_at: order.create_time,
            email_address: order.payer.email_address,
            amount: order.purchase_units[0].amount.value,
            status: order.status,
          };
          setFormData(updatedFormData);
          if (order.status === "COMPLETED") {
            handleSubmit(updatedFormData);
            handlePaymentMethod("PayPal");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await api.post("/payment/add", formData);
      if (response.data.status === "success") {
        console.log(response.data);
        toast.success("Payment successful.");
        handleSubmitAttendee();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div>
    <div ref={paypal}></div>
    // </div>
  );
};

export default Paypal;
