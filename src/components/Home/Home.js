import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMember } from "../../redux/action/employeesAction";
import Modal from "../Modal/Modal";
import Footer from "../Footer/Footer";

const Home = () => {
  const [show, setShow] = useState(false);
  const inputSearch = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  useEffect(() => {
    inputSearch.current.focus();
  }, []);
  const handleChange = (text) => {
    const type = text.includes(" ");
    if (type === true) {
      let arr = text.split(" ");
      let lastname = arr.pop().toLowerCase();
      let firstname = arr.join(" ").toLowerCase();
      setUrl(`member?firstName=${firstname}&lastName=${lastname}`);
    } else {
      setUrl(text);
    }
  };
  const fetch = async () => {
    document.body.style.cursor = "wait";
    await axios
      .get(`https://focalx-cert-generator.herokuapp.com/v1/members/${url}`)
      .then((res) => {
        document.body.style.cursor = "default";
        dispatch(setMember(res.data));
        navigate("/pdf");
      })
      .catch((err) => {
        document.body.style.cursor = "default";

        setShow(true);
      });
  };
  const clickEnter = (e) => {
    if (e.keyCode === 13) {
      fetch();
    }
  };

  return (
    <div className={style.contenar}>
      <div className={style.content}>
        <div className={style.pattren}>
          <img src={require("../images/pattren.svg").default} alt="logo" />
        </div>
        <p className={style.logo}>
          <img src={require("../images/logo.svg").default} alt="logo" />
        </p>
        <p className={style.paragraph}>Search By Name Or Certificate ID Number</p>
        <div>
          <div className={style.input}>
            <input
              type="text"
              placeholder="Search For Employee's Or Intern's"
              onChange={(e) => handleChange(e.target.value)}
              onKeyUp={clickEnter}
              ref={inputSearch}
              className="input"
            />

            <p>|</p>
            <span onClick={fetch} className={style.search}>
              <img src={require("../images/search.svg").default} alt="icon" />
            </span>
          </div>
        </div>
        <Link to="/login">log in</Link>
      </div>
      <Footer />
      {show && <Modal close={setShow} content="NOT FOUND" />}
    </div>
  );
};

export default Home;
