import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import style from "./User.module.css";

export default function ViewUser() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const state = useSelector((state) => state.allMembers);
  const member = state.find((e) => e.memberId === id);

  useEffect(() => {
    setData(member);
    console.log(member);
  }, [state]);
  console.log(data);

  return (
    <>
      {!data ? (
        <CircularProgress color="inherit" className={style.CircularProgress} />
      ) : (
        <div className={style.content}>
          <Row className="m-0">
            <div className="col-md-4 mb-1  m-auto" key={data.memberId}>
              <div className={style.card}>
                <p>
                  <b style={{ color: "#eb8324" }}>Name : </b>
                  {data.firstName} {data.lastName}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>memberId</b> :{data.memberId}
                </p>
                {/* <p>
                  <b style={{ color: "#eb8324" }}>generatedId </b>:{data.generatedId}
                </p> */}
                <p>
                  <b style={{ color: "#eb8324" }}>specification </b> :{data.specification}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>duration </b>:{data.duration}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>projects</b> :{data.projects}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>address</b> :{data.address}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}> kpi</b> :{data.kpi}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>hardSkills</b> :{data.hardSkills}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>softSkills </b> :{data.softSkills}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>supervisor</b> :{data.supervisor}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>startDate </b>:{data.startDate}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>endDate </b>:{data.endDate}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>isIntern </b>:{data.isIntern}
                </p>
                <p>
                  <b style={{ color: "#eb8324" }}>isEmployee </b>:{data.isEmployee}
                </p>
              </div>
            </div>
          </Row>
        </div>
      )}
    </>
  );
}
