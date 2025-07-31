import "./Kambaz.css";


const courses = [
  { id: 1, title: "Web Dev 1", link: "/Kambaz/Course/1" },
  { id: 2, title: "Data Structures", link: "/Kambaz/Course/2" },
  { id: 3, title: "Algorithms", link: "/Kambaz/Course/3" },
];

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <h4>Published Courses</h4>
      <div className="kambaz-dashboard-courses">
        {courses.map(course =>
          <div className="kambaz-course-card" key={course.id}>
            <h5>{course.title}</h5>
            <p>{course.desc}</p>
            <a href={`#${course.link}`}>Go to course</a>
          </div>
        )}
      </div>
    </div>
  );
}
