import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import default styles for react-phone-number-input
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS

export default function App() {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <PhoneInput
        country={"eg"}
        enableSearch={true}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
      />
    </div>
  );
}
