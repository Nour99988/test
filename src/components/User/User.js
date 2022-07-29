import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../../redux/action/employeesAction";
import style from "./User.module.css";
import { useCookies } from "react-cookie";

const Users = () => {
  const [cookies] = useCookies("token")
  const dispatch = useDispatch();
  const [member, setMember] = useState([]);
  const state = useSelector((state) => state.allMembers);
  const fetchEmployees = async () => {
    await axios
      .get("https://focalx-cert-generator.herokuapp.com/v1/members",{
        headers:{
          Authorization: "bearer "+ cookies.token
        }
      })
      .then((res) => dispatch(setEmployees(res.data)))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setMember(state);
  }, [state]);

  const Handlerender = (e) => {
    const { value } = e.target;
    if (value === "Intern") {
      const Interns = state.filter((emp) => emp.isIntern === true);
      setMember(Interns);
      console.log(member);
    } else if (value === "Employee") {
      const employees = state.filter((emp) => emp.isEmployee === true);
      setMember(employees);
      console.log(member);
    } else if (value === "all") {
      setMember(state);
      console.log(member);
    }
  };
  const render = member.map((user) => {
    return (
      <>
        <div className="col-md-4 mt-40" key={user.memberId}>
          <div className={style.card}>
            <p>
              <b style={{ color: "#eb8324" }}>Name : </b>
              {user.firstName} {user.lastName}
            </p>
            <p>
              <b style={{ color: "#eb8324" }}>Specification : </b>
              {user.specification}
            </p>
            <Link className={style.linkview} to={`/viewMember/${user.memberId}`}>
              view
            </Link>
            <Link className={style.link} to={`/edit/${user.memberId}`}>
              Edit
            </Link>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
    <form className={style.form}>
        <select onClick={(e) => Handlerender(e)} className={style.select}>
          <option value="all">all Members</option>
          <option value="Employee">Employee</option>
          <option value="Intern">Intern</option>
        </select>
      </form>
      <div className="content" style={{ paddingLeft: "30px" }}>
        <Row className="m-0">{render}</Row>
      </div>
      
    </>
  );
};

export default Users;
