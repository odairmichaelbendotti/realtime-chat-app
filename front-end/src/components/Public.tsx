import { useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { authuser, handleCheckAuth, isChecking } = useAuth();

  useEffect(() => {
    handleCheckAuth();
  }, []);

  useEffect(() => {
    if (!isChecking) {
      if (authuser) {
        navigate("/");
        return;
      }
    }
  }, [navigate, isChecking, authuser]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
