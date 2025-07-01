import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  function handleSignout() {
    navigate("/Kambaz/Account/Signin");
  }

  return (
    <div>
      <h2>Profile</h2>
      <form>
        <div className="mb-2">
          <label>Username</label>
          <input className="form-control" type="text" defaultValue="jdoe" />
        </div>
        <div className="mb-2">
          <label>First Name</label>
          <input className="form-control" type="text" defaultValue="Jane" />
        </div>
        <div className="mb-2">
          <label>Last Name</label>
          <input className="form-control" type="text" defaultValue="Doe" />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input className="form-control" type="password" defaultValue="test123" />
        </div>
        <div className="mb-2">
          <label>Date of Birth</label>
          <input className="form-control" type="date" defaultValue="2000-01-01" />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input className="form-control" type="email" defaultValue="jdoe@neu.edu" />
        </div>
        <div className="mb-2">
          <label>Role</label>
          <select className="form-select" defaultValue="Student">
            <option>Student</option>
            <option>Faculty</option>
            <option>Admin</option>
            <option>Staff</option>
          </select>
        </div>
      </form>
      <button className="btn btn-warning mt-2" onClick={handleSignout}>Sign Out</button>
    </div>
  );
}
