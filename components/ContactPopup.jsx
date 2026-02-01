"use client";

import { useState } from "react";

export default function ContactPopup({ config }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: open ? "300px" : "60px",
        height: open ? "400px" : "60px",
        borderRadius: "15px",
        background: config.colors.background || "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        overflow: "hidden",
        transition: "all 0.4s ease",
        fontFamily: "sans-serif",
        zIndex: 9999,
      }}
    >
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: "bold",
            color: config.colors.primary || "#4F46E5",
          }}
        >
          Contact
        </div>
      )}

      {open && !submitted && (
        <form
          onSubmit={handleSubmit}
          style={{ padding: "15px", display: "flex", flexDirection: "column" }}
        >
          {config.fields.name && (
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
            />
          )}
          {config.fields.email && (
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
            />
          )}
          {config.fields.phone && (
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
            />
          )}
          {config.fields.urgency && (
            <select name="urgency" onChange={handleChange} style={{ marginBottom: "10px", padding: "8px", borderRadius: "5px" }}>
              <option value="">Urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          )}
          {config.fields.message && (
            <textarea
              name="message"
              placeholder="Message"
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
            />
          )}
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "5px",
              background: config.colors.primary || "#4F46E5",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ marginTop: "10px", background: "#eee", padding: "8px", borderRadius: "5px", cursor: "pointer" }}
          >
            Close
          </button>
        </form>
      )}

      {submitted && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          Thank you! <br />
          We will contact you soon.
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{ marginTop: "10px", background: "#eee", padding: "8px", borderRadius: "5px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
