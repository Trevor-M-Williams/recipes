import { RecipeProvider } from "../context/RecipeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecipeProvider>
      <Component {...pageProps} />
    </RecipeProvider>
  );
}

export default MyApp;
