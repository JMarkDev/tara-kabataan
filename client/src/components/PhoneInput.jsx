import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function App({ attendeePhone, onPhoneChange }) {
  const [phone, setPhone] = useState("");
  useEffect(() => {
    onPhoneChange(phone);
  }, [phone]);

  useEffect(() => {
    if (attendeePhone) {
      setPhone(attendeePhone);
    }
  }, [attendeePhone]);

  return (
    <PhoneInput
      country={"eg"}
      enableSearch={true}
      value={phone}
      inputStyle={{ width: "100%", height: "40px" }}
      onChange={(phone) => setPhone(phone)}
    />
  );
}
