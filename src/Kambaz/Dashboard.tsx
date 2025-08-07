import { useEffect, useState } from "react";

// Course data type
type Course = {
  id: string;
  title: string;
  description: string;
  instructor?: string;
};

// random ID for new courses
function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

// Get courses from localStorage or start with demo data
function getStoredCourses(): Course[] {
  const stored = localStorage.getItem("kambaz-courses");
  if (stored) return JSON.parse(stored);
  // Initial 
  return [
    {
      id: randomId(),
      title: "React Fundamentals",
      description: "Learn the basics of React and build cool stuff.",
      instructor: "alice"
    },
    {
      id: randomId(),
      title: "Node.js for Beginners",
      description: "Backend development made easy.",
      instructor: "bob"
    }
  ];
}

export default function Dashboard() {
  // Courses state
  const [courses, setCourses] = useState<Course[]>(getStoredCourses());
  // For add/edit form
  const [form, setForm] = useState<Partial<Course>>({ title: "", description: "", instructor: "" });
  const [editing, setEditing] = useState<string | null>(null); // course id if editing

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kambaz-courses", JSON.stringify(courses));
  }, [courses]);

  // Handle input changes in form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new course
  const handleAdd = () => {
    if (!form.title || !form.description) {
      alert("Title and description required.");
      return;
    }
    setCourses([
      ...courses,
      {
        id: randomId(),
        title: form.title,
        description: form.description,
        instructor: form.instructor || "faculty"
      }
    ]);
    setForm({ title: "", description: "", instructor: "" });
  };

  // Edit course 
  const handleEdit = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (course) {
      setForm(course);
      setEditing(id);
    }
  };

  // Save edited course
  const handleSave = () => {
    setCourses(courses.map(c =>
      c.id === editing
        ? { ...c, ...form }
        : c
    ));
    setForm({ title: "", description: "", instructor: "" });
    setEditing(null);
  };

  // Delete course
  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    if (editing === id) {
      setForm({ title: "", description: "", instructor: "" });
      setEditing(null);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Courses</h2>
      <div style={{ marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Course title"
          value={form.title || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="instructor"
          placeholder="Instructor"
          value={form.instructor || ""}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={handleChange}
          style={{ marginRight: 8, verticalAlign: "top" }}
        />
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleAdd}>Add Course</button>
        )}
        {editing && (
          <button
            onClick={() => {
              setEditing(null);
              setForm({ title: "", description: "", instructor: "" });
            }}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        )}
      </div>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course =>
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.instructor}</td>
              <td>{course.description}</td>
              <td>
                <button onClick={() => handleEdit(course.id)}>Edit</button>
                <button onClick={() => handleDelete(course.id)} style={{ marginLeft: 8, color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
