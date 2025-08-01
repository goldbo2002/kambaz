import "./Kambaz.css";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Web Dev 1",
    link: "/Kambaz/Course/1",
    desc: "Intro to web development with HTML, CSS, JS.",
    instructor: "Dr. Smith",
    img: "https://placehold.co/260x140?text=Web+Dev",
  },
  {
    id: 2,
    title: "Data Structures",
    link: "/Kambaz/Course/2",
    desc: "Lists, trees, graphs, and algorithms.",
    instructor: "Prof. Lee",
    img: "https://placehold.co/260x140?text=Data+Structures",
  },
  {
    id: 3,
    title: "Algorithms",
    link: "/Kambaz/Course/3",
    desc: "Sorting, searching, recursion, and more.",
    instructor: "Dr. Patel",
    img: "https://placehold.co/260x140?text=Algorithms",
  },
];

function CourseCard({ course }: { course: typeof courses[0] }) {
  return (
    <div className="kambaz-course-card">
      <img src={course.img} alt={course.title} />
      <h5>{course.title}</h5>
      <p style={{ fontSize: "0.98em", color: "#444" }}>{course.desc}</p>
      <div style={{ fontSize: "0.93em", marginBottom: 8 }}>Instructor: {course.instructor}</div>
      <Link to={`/Kambaz/Course/${course.id}`}>Go to course</Link>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <h4>Published Courses</h4>
      <div className="kambaz-dashboard-courses">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
