import "./App.css";
import AuthContainer from "./components/Context/AuthContainer";
import AuthenticatedApp from "./AuthenticatedApp";

function App() {
  return (
    <>
      <AuthContainer>
        <AuthenticatedApp />
      </AuthContainer>
    </>
  );
}

export default App;
