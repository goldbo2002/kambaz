import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./lib/api"; // adjust path if needed

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    // Fetch user session
    api
      .get("/users/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    // Dynamic content
    const quotes = [
      "Learning never exhausts the mind.",
      "Build something great today.",
      "Welcome to Kambaz — your learning HQ.",
      "Make progress every day.",
      "Keep pushing forward.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">
          {user
            ? `Welcome back, ${user.firstName || user.username}!`
            : "Welcome to Kambaz"}
        </h1>
        <p className="lead">{quote}</p>
        {!user ? (
          <>
            <p className="mt-3">
              Kambaz helps you manage your courses, assignments, and learning
              materials efficiently.
            </p>
            <Link to="/account/signup" className="btn btn-primary me-2">
              Sign Up
            </Link>
            <Link to="/account/signin" className="btn btn-outline-secondary">
              Sign In
            </Link>
          </>
        ) : (
          <Link to="/dashboard" className="btn btn-success mt-3">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
