import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const AuthGate = ({ children }) => {
  const { currentUser, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, initializing]);

  if (initializing) {
    return <div>Loading...</div>; // Or a loading spinner if you want
  }

  return children;
};

export default AuthGate;
