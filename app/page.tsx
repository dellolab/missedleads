"use client";
import { useState } from "react";


import ContactPopup from "../components/ContactPopup";

const popupConfig = {
  fields: { name: true, email: true, phone: true, urgency: true, message: true },
  colors: { primary: "#4F46E5", background: "#fff" },
};

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to My Site</h1>
      {/* Your page content */}

      {/* Place the popup component anywhere — it will be fixed in bottom corner */}
      <ContactPopup config={popupConfig} />
    </div>
  );
}
