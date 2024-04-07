import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomeList from "./Components/HomeList";
import PrevTest from "./Components/prevTest/prevTest";
import CurrTest from "./Components/currTest/currTest";
import FutureTest from "./Components/futureTest/futureTest";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import QuestionsPage from "./Components/Paper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginSignup} />
        <Route path="/home" Component={HomeList} />
        <Route path="/previous-tests" Component={PrevTest} />
        <Route path="/current-tests" Component={CurrTest} />
        <Route path="/future-tests" Component={FutureTest} />
        <Route path="/test/:testTitle" Component={QuestionsPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
