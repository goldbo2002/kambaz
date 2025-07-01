import Sidebar from "./Sidebar";

const courses = [
  { id: 1, title: "Web Dev 1", link: "/Kambaz/Course/1" },
  { id: 2, title: "Data Structures", link: "/Kambaz/Course/2" },
  { id: 3, title: "Algorithms", link: "/Kambaz/Course/3" },
];

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2>Dashboard</h2>
        <h4>Published Courses</h4>
        <ul>
          {courses.map(course =>
            <li key={course.id}>
              <a href={`#${course.link}`}>{course.title}</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
