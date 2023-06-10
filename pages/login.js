import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { currentUser, signInWithGoogle, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const loginWithGoogle = async () => {
    try {
      signInWithGoogle();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
