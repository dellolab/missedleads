"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("dashboardLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: "8px", marginBottom: "10px" }} />
        <br />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
