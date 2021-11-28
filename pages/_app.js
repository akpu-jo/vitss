import "../styles/globals.css";
import { Provider } from "../contexts/AppContext";
import FirebaseAuthState from "../components/FirebaseAuthState";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <FirebaseAuthState>
        <Component {...pageProps} />
      </FirebaseAuthState>
    </Provider>
  );
}

export default MyApp;
