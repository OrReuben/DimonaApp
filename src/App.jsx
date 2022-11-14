import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import AllUpdatesPage from "./Pages/AllUpdatesPage/AllUpdatesPage";
import AllTasks from "./Pages/AllTasks/AllTasks";
import Login from "./Pages/Login/Login";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Register from "./Pages/Register/Register";
import OngoingTasks from "./Pages/OngoingTasks/OngoingTasks";

function App() {
  const user = localStorage.getItem("logged");
  let isAdmin = JSON.parse(user)?.isAdmin;
  const [selected, setSelected] = useState(0);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              user ? (
                <AllTasks setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/noti"
            element={
              user ? (
                <AllUpdatesPage setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/ongoing-tasks"
            element={
              user ? (
                <OngoingTasks setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>

          <Route
            path="/admin"
            element={
              user && isAdmin ? (
                <AdminPanel setSelected={setSelected} selected={selected} />
              ) : user ? (
                <Home setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/register"
            element={
              user && isAdmin ? (
                <Register />
              ) : user ? (
                <Home setSelected={setSelected} selected={selected} />
              ) : (
                <Login />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
