import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function App() {
  const [phone, setPhone] = useState("");
  localStorage.setItem('phone', phone.toString());

  return (
    <PhoneInput
      country={"eg"}
      enableSearch={true}
      value={phone}
      inputStyle={{ width: '100%', height: '40px' }}
      onChange={(phone) => setPhone(phone)}
    />
  );
}
