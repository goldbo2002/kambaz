import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function People() {
  const { cid } = useParams<{ cid?: string }>();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (!cid) return;
    api.get(`/courses/${cid}/people`)
      .then(r => setList(r.data))
      .catch(() => {});
  }, [cid]);

  if (!cid) return <div>Loading...</div>;

  return (
    <div>
      <h3>People</h3>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Username</th><th>Role</th></tr>
        </thead>
        <tbody>
          {list.map((u: any) => (
            <tr key={u._id}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
