import React, { useEffect, useRef, useState } from "react";
import api from "../api/api";
import Cookies from "js-cookie";

const Paypal = ({ handlePaymentMethod, total, title, event_id }) => {
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
  const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    handlePaymentMethod("PayPal");
  }, [paymentMethod]);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/payment/add", formData);
      console.log(response.data);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);

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
          console.log(order);
          setPaymentMethod("PayPal");
          setFormData({
            ...formData,
            transaction_id: order.id,
            created_at: order.create_time,
            email_address: order.payer.email_address,
            amount: order.purchase_units[0].amount.value,
            status: order.status,
          });

          setTimeout(() => {
            handleSubmit();
          }, 3000);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    // <div>
    <div ref={paypal}></div>
    // </div>
  );
};

export default Paypal;
