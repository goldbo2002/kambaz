import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const nav = useNavigate();
  const [a, setA] = useState<any>({
    title: "A1 - HTML",
    description: "Write semantic HTML.",
    points: 100,
    group: "Assignments",
    displayGradeAs: "Points",
    submissionType: "Online",
    onlineOptions: { text: true, url: true, media: false, annotation: false, file: false },
    assignTo: "Everyone",
    dueDate: new Date().toISOString().slice(0, 10),
    availableFrom: new Date().toISOString().slice(0, 10),
    availableUntil: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    if (aid && aid !== "new") {
      api.get(`/assignments/${aid}`).then(res => setA(res.data)).catch(() => {});
    }
  }, [aid]);

  const set = (key: string) => (e: any) => setA((prev: any) => ({ ...prev, [key]: e.target.value }));
  const setChk = (key: keyof typeof a.onlineOptions) => (e: any) =>
    setA((prev: any) => ({
      ...prev,
      onlineOptions: { ...prev.onlineOptions, [key]: !!e.target.checked }
    }));

  const save = async () => {
    if (!aid || aid === "new") {
      await api.post(`/courses/${cid}/assignments`, a);
    } else {
      await api.put(`/assignments/${aid}`, a);
    }
    nav(`/Kambaz/Course/${cid}/Assignments`);
  };

  return (
    <div className="container">
      <h3>Assignment Editor</h3>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control" value={a.title} onChange={set("title")} />
        </div>
        <div className="col-12">
          <label className="form-label">Assignment Description</label>
          <textarea id="wd-description" className="form-control" rows={4} value={a.description} onChange={set("description")} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Points</label>
          <input id="wd-points" className="form-control" type="number" value={a.points} onChange={set("points")} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Assignment Group</label>
          <select id="wd-group" className="form-select" value={a.group} onChange={set("group")}>
            <option>Assignments</option>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Project</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Display Grade as</label>
          <select id="wd-display-grade-as" className="form-select" value={a.displayGradeAs} onChange={set("displayGradeAs")}>
            <option>Points</option>
            <option>Percentage</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-select" value={a.submissionType} onChange={set("submissionType")}>
            <option>Online</option>
            <option>On Paper</option>
          </select>
        </div>

        <div className="col-md-8">
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input id="wd-text-entry" className="form-check-input" type="checkbox" checked={a.onlineOptions.text} onChange={setChk("text")} />
            <label className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input id="wd-website-url" className="form-check-input" type="checkbox" checked={a.onlineOptions.url} onChange={setChk("url")} />
            <label className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input id="wd-media-recordings" className="form-check-input" type="checkbox" checked={a.onlineOptions.media} onChange={setChk("media")} />
            <label className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input id="wd-student-annotation" className="form-check-input" type="checkbox" checked={a.onlineOptions.annotation} onChange={setChk("annotation")} />
            <label className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input id="wd-file-upload" className="form-check-input" type="checkbox" checked={a.onlineOptions.file} onChange={setChk("file")} />
            <label className="form-check-label">File Uploads</label>
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Assign To</label>
          <input id="wd-assign-to" className="form-control" value={a.assignTo} onChange={set("assignTo")} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Due Date</label>
          <input id="wd-due-date" type="date" className="form-control" value={a.dueDate} onChange={set("dueDate")} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Available From</label>
          <input id="wd-available-from" type="date" className="form-control" value={a.availableFrom} onChange={set("availableFrom")} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Available Until</label>
          <input id="wd-available-until" type="date" className="form-control" value={a.availableUntil} onChange={set("availableUntil")} />
        </div>

        <div className="col-12">
          <button className="btn btn-primary w-100" onClick={save}>Save Assignment</button>
        </div>
      </div>
    </div>
  );
}
