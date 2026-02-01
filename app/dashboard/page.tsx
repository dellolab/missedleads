"use client";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  urgency?: string;
  message?: string;
  created_at: string;
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("dashboardLoggedIn") !== "true") {
      window.location.href = "/dashboard/login";
      return;
    }
    fetch("/api/getSubmissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoading(false);
      });
  }, []);

  const filtered = filter ? submissions.filter((s) => s.urgency === filter) : submissions;

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <label>
        Filter by urgency:
        <select onChange={(e) => setFilter(e.target.value)} value={filter} style={{ marginLeft: "10px" }}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Urgency</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.email}</td>
              <td style={tdStyle}>{s.phone}</td>
              <td style={tdStyle}>{s.urgency}</td>
              <td style={tdStyle}>{s.message}</td>
              <td style={tdStyle}>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { textAlign: "left", padding: "8px" };
const tdStyle = { textAlign: "left", padding: "8px" };
