"use client";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  urgency?: "High" | "Medium" | "Low";
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
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter
    ? submissions.filter((s) => s.urgency === filter)
    : submissions;

  if (loading) return <p style={{ padding: 20 }}>Loading…</p>;

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <header style={headerStyle}>
          <h1 style={{ margin: 0 }}>Missed Leads</h1>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="">All urgencies</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </header>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Urgency</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.phone}</td>
                  <td style={tdStyle}>
                    <UrgencyBadge value={s.urgency} />
                  </td>
                  <td style={tdStyle}>{s.message}</td>
                  <td style={tdStyle}>
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */

function UrgencyBadge({ value }: { value?: string }) {
  if (!value) return null;

  const colors: Record<string, string> = {
    High: "#dc2626",
    Medium: "#f59e0b",
    Low: "#16a34a",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: "white",
        background: colors[value],
      }}
    >
      {value}
    </span>
  );
}

/* ---------- Styles ---------- */

const pageStyle: React.CSSProperties = {
  padding: "20px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const cardStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  background: "white",
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  padding: 20,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
};

const selectStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: "auto",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: 700,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #e5e7eb",
  fontSize: 14,
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: 14,
};
