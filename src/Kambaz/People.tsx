import { useEffect, useState } from "react";

// User data type
type User = {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

// Generate random ID for new users
function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

// Get users from localStorage or use demo
function getStoredUsers(): User[] {
  const stored = localStorage.getItem("kambaz-users");
  if (stored) return JSON.parse(stored);
  // Demo users
  return [
    { id: randomId(), username: "alice", firstName: "Alice", lastName: "Liddell", email: "alice@example.com", role: "admin" },
    { id: randomId(), username: "bob", firstName: "Bob", lastName: "Builder", email: "bob@example.com", role: "student" }
  ];
}

export default function People() {
  // Users state (persisted)
  const [users, setUsers] = useState<User[]>(getStoredUsers());
  const [form, setForm] = useState<Partial<User>>({ username: "", firstName: "", lastName: "", email: "", role: "" });
  const [editing, setEditing] = useState<string | null>(null);
  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("kambaz-users", JSON.stringify(users));
  }, [users]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add user
  const handleAdd = () => {
    if (!form.username || !form.firstName || !form.lastName) {
      alert("Username, first and last name required.");
      return;
    }
    setUsers([
      ...users,
      {
        id: randomId(),
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role || "student"
      } as User
    ]);
    setForm({ username: "", firstName: "", lastName: "", email: "", role: "" });
  };

  // Edit user (start editing)
  const handleEdit = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setForm(user);
      setEditing(id);
    }
  };

  // Save edited user
  const handleSave = () => {
    setUsers(users.map(u =>
      u.id === editing
        ? { ...u, ...form }
        : u
    ));
    setForm({ username: "", firstName: "", lastName: "", email: "", role: "" });
    setEditing(null);
  };

  // Delete user
  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    if (editing === id) {
      setForm({ username: "", firstName: "", lastName: "", email: "", role: "" });
      setEditing(null);
    }
    if (selected?.id === id) setSelected(null);
  };

  // Filtered user list
  const filteredUsers = users.filter(u =>
    (!filterName || `${u.firstName} ${u.lastName}`.toLowerCase().includes(filterName.toLowerCase()) || u.username.toLowerCase().includes(filterName.toLowerCase())) &&
    (!filterRole || (u.role || "").toLowerCase().includes(filterRole.toLowerCase()))
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>People</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Filter by name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ marginRight: 8 }}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button onClick={() => {
          setFilterName(""); setFilterRole("");
        }}>Clear Filters</button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <input
          name="username"
          placeholder="Username"
          value={form.username || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="firstName"
          placeholder="First name"
          value={form.firstName || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="lastName"
          placeholder="Last name"
          value={form.lastName || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <select
          name="role"
          value={form.role || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        >
          <option value="">Role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleAdd}>+ People</button>
        )}
        {editing && (
          <button onClick={() => {
            setEditing(null);
            setForm({ username: "", firstName: "", lastName: "", email: "", role: "" });
          }} style={{ marginLeft: 8 }}>Cancel</button>
        )}
      </div>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(u =>
            <tr key={u.id}>
              <td>
                <a href="#" onClick={() => setSelected(u)}>
                  {u.firstName} {u.lastName}
                </a>
              </td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u.id)}>Edit</button>
                <button onClick={() => handleDelete(u.id)} style={{ marginLeft: 8, color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selected && (
        <div style={{ marginTop: 24, border: "1px solid #ccc", padding: 16 }}>
          <h3>People Details</h3>
          <p><b>Name:</b> {selected.firstName} {selected.lastName}</p>
          <p><b>Username:</b> {selected.username}</p>
          <p><b>Email:</b> {selected.email}</p>
          <p><b>Role:</b> {selected.role}</p>
          <button onClick={() => setSelected(null)} style={{ marginTop: 8 }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
