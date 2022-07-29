import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import { useDispatch } from "react-redux";
import { setAdmin } from "./redux/action/employeesAction";
import { useCookies } from "react-cookie";
import axios from "axios";
import CheakAllow from "./hooks/CheakAllow";

function App() {
  const [cookies] = useCookies("token");
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    await axios
      .get("https://focalx-cert-generator.herokuapp.com/v1/members", {
        headers: {
          Authorization: "bearer " + cookies.token,
        },
      })
      .then((res) => dispatch(setAdmin({ isLogin: "admin" })));
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/dashboard">
        <NavBar />
        <CheakAllow />
      </BrowserRouter>
    </div>
  );
}

export default App;
