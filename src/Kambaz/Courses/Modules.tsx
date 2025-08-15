import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Module = {
  _id: string;
  title: string;
  // add more fields as needed
};

const Modules = () => {
  const { cid } = useParams<{ cid?: string }>();
  const [modules, setModules] = useState<Module[]>([]);

useEffect(() => {
  if (!cid) {
    console.error("❌ Missing course ID in Modules");
    return;
  }

  api
    .get(`/modules/${cid}`)
    .then((res: { data: any[] }) => setModules(res.data))
    .catch((err: unknown) => {
      console.error("🔥 Failed to fetch modules", err);
    });
}, [cid]);

};

export default Modules;
