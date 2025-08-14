import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function ModuleEditor() {
  const { cid, mid } = useParams<{ cid?: string; mid?: string }>();
  const nav = useNavigate();

  if (!cid) return <div>Loading...</div>;
  const isNew = mid === "new" || !mid;

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!isNew && cid && mid) {
      api.get(`/modules/${cid}/${mid}`)
        .then((res) => setTitle(res.data.title))
        .catch(() => {});
    }
  }, [cid, mid, isNew]);

  const handleSave = async () => {
    if (!title) return alert("Title required");

    const endpoint = isNew
      ? `/courses/${cid}/modules`
      : `/courses/${cid}/modules/${mid}`;
    const method = isNew ? api.post : api.put;

    try {
      await method(endpoint, { title });
      nav(`/courses/${cid}`);
    } catch {
      alert("Save failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isNew ? "New Module" : "Edit Module"}</h3>
      <input
        className="form-control mb-3"
        value={title}
        placeholder="Module Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
