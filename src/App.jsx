import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllTasks from "./components/AllTasks/AllTasks";
import Login from "./components/Login/Login";
import AllUpdatesPage from "./components/AllUpdatesPage/AllUpdatesPage";

function App() {
  const api = " https://dimona-api.cyclic.app/api/";
  const user = localStorage.getItem("logged");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home api={api} /> : <Login api={api} />}
        ></Route>
        <Route
          path="/tasks"
          element={user ? <AllTasks api={api} /> : <Login api={api} />}
        ></Route>
        <Route
          path="/noti"
          element={user ? <AllUpdatesPage api={api} /> : <Login api={api} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
