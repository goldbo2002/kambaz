import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    navigate("/Kambaz/Account/Profile");
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <div className="mb-2">
          <label>Username</label>
          <input className="form-control" type="text" defaultValue="jdoe" />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input className="form-control" type="password" defaultValue="test123" />
        </div>
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
      <div className="mt-2">
        <Link to="../Signup">Go to Signup</Link>
      </div>
    </div>
  );
}
