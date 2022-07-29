import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Add from "../components/Add/Add";
import User from "../components/User/User";
import Edit from "../components/Edit/Edit";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import ViewUser from "../components/User/ViewUser";
import Page404 from "../components/page404/Page404";
import Certificate from "../components/Certificate/Certificate";
import { useSelector } from "react-redux";

const CheakAllow = () => {
  const allow = useSelector((state) => state.isAdmin);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf" element={<Certificate />} />
        {!allow.allow && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}

        {allow.allow && (
          <>
            <Route path="/viewMember/:id" element={<ViewUser />} />
            <Route path="/add" element={<Add />} />
            <Route path="/user" element={<User />} />
            <Route path="/edit/:id" element={<Edit />} />
          </>
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default CheakAllow;
