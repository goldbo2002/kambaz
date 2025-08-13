import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { AxiosError } from "axios";
import { api } from "../../lib/api"; // adjust path if your api client lives elsewhere

type SignupForm = {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });
      // success → go to dashboard (or profile)
      console.log("Signup success:", res.data);
      navigate("/Kambaz/Dashboard");
    } catch (err: unknown) {
      const axErr = err as AxiosError<{ message?: string }>;
      const msg =
        axErr.response?.data?.message ||
        axErr.message ||
        "Signup failed. Please try again.";
      console.error("Signup failed:", msg, axErr);
      setError(msg);
    }
  };

  return (
    <div className="container my-4">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
            type="text"
          />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}
