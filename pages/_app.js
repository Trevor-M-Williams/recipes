import AuthGate from "../auth/AuthGate";
import { AuthProvider } from "../context/AuthContext";
import { RecipeProvider } from "../context/RecipeContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthGate>
        <RecipeProvider>
          <Component {...pageProps} />
        </RecipeProvider>
      </AuthGate>
    </AuthProvider>
  );
}

export default App;
