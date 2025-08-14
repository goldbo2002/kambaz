import { useParams } from "react-router-dom";

export default function ParamsGuard({ children }: { children: React.ReactNode }) {
  const { cid } = useParams<{ cid?: string }>();
  return cid ? <>{children}</> : <div>Loading...</div>;
}
