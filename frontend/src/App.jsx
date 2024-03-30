import './App.css'
import './Components/LoginSignup/LoginSignup.jsx'
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx';
import HomeList from "./Components/HomeList.tsx";

function App() {
  return (
    <>
      <LoginSignup />
      <HomeList />
    </>

  );
}

export default App;
