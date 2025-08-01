import { useParams, Link } from "react-router-dom";

const courses = [
  { id: 1, title: "Web Dev 1", desc: "Intro to web dev", instructor: "Dr. Smith" },
  { id: 2, title: "Data Structures", desc: "Trees and graphs", instructor: "Prof. Lee" },
  { id: 3, title: "Algorithms", desc: "Sorting and searching", instructor: "Dr. Patel" },
];

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === id);

  if (!course) return <div><h3>Course not found</h3></div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>{course.title}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p>{course.desc}</p>
      {/* Just a stub for module list */}
      <h4>Modules</h4>
      <ul>
        <li>Module 1 – Overview</li>
        <li>Module 2 – Core Concepts</li>
        <li>Module 3 – Final Project</li>
      </ul>
      <Link to="/Kambaz/dashboard">Back to Dashboard</Link>
    </div>
  );
}
