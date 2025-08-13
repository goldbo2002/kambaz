import React from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

type Module = { _id: string; name: string; description?: string; };

export default function CourseModules() {
  const { cid } = useParams();
  const [mods, setMods] = React.useState<Module[]>([]);
  const [name, setName] = React.useState("New Module");

  const load = React.useCallback(async () => {
    if (!cid) return;
    const { data } = await api.get<Module[]>(`/courses/${cid}/modules`);
    setMods(data);
  }, [cid]);

  React.useEffect(() => { load(); }, [load]);

  const createModule = async () => {
    if (!cid) return;
    try {
      const { data } = await api.post<Module>(`/courses/${cid}/modules`, { name });
      setMods(list => [data, ...list]);
      setName("New Module");
    } catch (e: any) {
      console.error("Create module failed:", e?.response?.status, e?.message);
      alert("Create module failed. Are you opening a course page with a valid :cid?");
    }
  };

  const updateModule = async (m: Module, newName: string) => {
    try {
      const { data } = await api.put<Module>(`/modules/${m._id}`, { name: newName });
      setMods(list => list.map(x => (x._id === m._id ? data : x)));
    } catch (e: any) {
      console.error("Update module failed:", e?.response?.status, e?.message);
      alert("Update module failed.");
    }
  };

  const deleteModule = async (m: Module) => {
    try {
      await api.delete(`/modules/${m._id}`);
      setMods(list => list.filter(x => x._id !== m._id));
    } catch (e: any) {
      console.error("Delete module failed:", e?.response?.status, e?.message);
      alert("Delete module failed.");
    }
  };

  return (
    <div>
      <h3>Modules</h3>
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" style={{ maxWidth: 300 }} value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn btn-danger" onClick={createModule}>+ Module</button>
      </div>

      <ul className="list-group">
        {mods.map(m => (
          <li key={m._id} className="list-group-item d-flex align-items-center">
            <input
              className="form-control me-2"
              value={m.name}
              onChange={(e) => setMods(list => list.map(x => x._id === m._id ? { ...x, name: e.target.value } : x))}
              onBlur={(e) => updateModule(m, e.target.value)}
            />
            <button className="btn btn-outline-danger btn-sm" onClick={() => deleteModule(m)}>Delete</button>
          </li>
        ))}
        {mods.length === 0 && <li className="list-group-item text-muted">No modules</li>}
      </ul>
    </div>
  );
}
