import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function People() {
  const { cid } = useParams();
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    api.get(`/courses/${cid}/people`).then(r=>setList(r.data));
  }, [cid]);
  return (
    <div>
      <h3>People</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Username</th><th>Role</th></tr></thead>
        <tbody>
          {list.map((u:any)=>(
            <tr key={u._id}><td>{u.firstName} {u.lastName}</td><td>{u.username}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
