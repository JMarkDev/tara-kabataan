import React, { useEffect, useRef, useState } from "react";

const Paypal = ({ handlePaymentMethod, total, title }) => {
  const paypal = useRef();
  const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    handlePaymentMethod("PayPal");
  }, [paymentMethod]);

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
