import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    navigate("/Kambaz/Account/Profile");
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-2">
          <label>Username</label>
          <input className="form-control" type="text" defaultValue="newuser" />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input className="form-control" type="password" defaultValue="password1" />
        </div>
        <div className="mb-2">
          <label>Verify Password</label>
          <input className="form-control" type="password" defaultValue="password1" />
        </div>
        <button className="btn btn-success" type="submit">Sign Up</button>
      </form>
      <div className="mt-2">
        <Link to="../Signin">Go to Signin</Link>
      </div>
    </div>
  );
}
