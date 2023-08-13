import logo from "./logo.svg";
import "./App.css";
import AllUsers from "./components/AllUsers";
import { Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import LoginPage from "./auth/LoginPage";
import { Navigate } from "react-router-dom";

function App() {
  const currentUser = false;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <AllUsers />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/adduser"
          element={
            <RequireAuth>
              <AddUser />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/edit/:id"
          element={
            <RequireAuth>
              <UpdateUser />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
