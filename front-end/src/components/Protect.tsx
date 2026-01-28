import { useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router";

export default function Protect({ children }: { children: React.ReactNode }) {
  const { authuser, handleCheckAuth, isChecking } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckAuth();
  }, [navigate]);

  useEffect(() => {
    if (!isChecking) {
      if (!authuser) {
        navigate("/signin");
        return;
      }
    }
  }, [isChecking]);

  if (isChecking) return null;
  if (!authuser) return null;

  return <>{children}</>;
}
