import React, { useEffect, useState, createContext } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import { useCookies } from "react-cookie";
import style from "./Add.module.css";
import Modal from "../Modal/Modal";

const Add = () => {
  const [cookies] = useCookies("token");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    specification: "",
    address: "",
    kpi: 0,
    supervisor: "",
    duration: 0,
    startDate: "",
    endDate: "",
    projects: [],
    hardSkills: [],
    softSkills: [],
    isEmployee: Boolean(),
    isIntern: Boolean(),
  });

  const handelSubmet = (e) => {
    const { name, value } = e.target;
    if (name === "projects" || name === "hardSkills" || name === "softSkills") {
      setData((prevstate) => ({ ...prevstate, [name]: value.split(",") }));
    } else {
      setData((prevstate) => ({ ...prevstate, [name]: value }));
    }
  };
  const handelsubmition = (e) => {
    e.preventDefault();
    setFormError(validation(data));
    setIsSubmit(true);
  };
  const validation = (value) => {
    const errors = {};
    if (!value.firstName) {
      errors.firstName = "firstName is required!!";
    } else if (value.firstName.length < 3) {
      errors.firstName = "firstName is must be more 4 characters !!";
    }
    if (!value.lastName) {
      errors.lastName = "lastName is required!!";
    } else if (value.lastName.length < 3) {
      errors.lastName = "lastName is must be more 4 characters !!";
    }
    if (!value.specification) {
      errors.specification = "specification is required!!";
    }
    if (!value.address) {
      errors.address = "address is required!!";
    }
    if (!value.kpi) {
      errors.kpi = "kpi is required!!";
    } else if (value.kpi < 1) {
      errors.kpi = "kpi is must be more 0 number!!";
    }
    if (!value.supervisor) {
      errors.supervisor = "supervisor is required!!";
    }
    if (!value.duration) {
      errors.duration = "duration is required!!";
    } else if (value.duration < 1) {
      errors.duration = "duration is must be more 0 number!!";
    }
    if (!value.startDate) {
      errors.startDate = "startDate is required!!";
    }
    if (!value.endDate) {
      errors.endDate = "endDate is required!!";
    }

    return errors;
  };
  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length == 0 && isSubmit) {
      sendData();
    }
  }, [formError]);
  const sendData = async (e) => {
    let body = {
      firstName: data.firstName,
      lastName: data.lastName,
      specification: data.specification,
      address: data.address,
      kpi: data.kpi,
      supervisor: data.supervisor,
      duration: data.duration,
      startDate: data.startDate,
      endDate: data.endDate,
      projects: data.projects.split(","),
      hardSkills: data.hardSkills.split(","),
      softSkills: data.softSkills.split(","),
      isEmployee: data.isEmployee,
      isIntern: data.isIntern,
    };
    await axios
      .post("https://focalx-cert-generator.herokuapp.com/v1/members", body, {
        headers: {
          Authorization: "bearer " + cookies.token,
        },
      })
      .then((res) => {
        document.body.style.cursor = "default";
        console.log(res);
        setShow(true);
        setContent("تم اضافة موظف بنجاح");
      })
      .catch((err) => {
        document.body.style.cursor = "default";
        console.log(err);
        setShow(true);
        setContent(" تأكد من الاتصال بالانترنت ");
      });
  };
  return (
    <>
      <form noValidate className="px-3" onSubmit={handelsubmition}>
        <div className={style.add}>
          <div className={style.card}>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>firstName :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="firstName"
                  value={data.firstName}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.firstName}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>lastName :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="lastName"
                  value={data.lastName}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.lastName}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>specification :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="specification"
                  value={data.specification}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.specification}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>address :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="address"
                  value={data.address}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.address}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>kpi :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="kpi"
                  value={data.kpi}
                  type="number"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.kpi}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>supervisor :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="supervisor"
                  value={data.supervisor}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.supervisor}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>duration :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="duration"
                  value={data.duration}
                  type="number"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.duration}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>startDate :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="startDate"
                  value={data.startDate}
                  type="date"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.startDate}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>endDate :</label>
              </div>
              <div className="col-sm-3">
                <input
                  className={style.formcontrol}
                  name="endDate"
                  value={data.endDate}
                  type="date"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
              <span className={style.spans}>{formError.endDate}</span>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>projects :</label>
              </div>
              <div className="col-sm-3">
                <input
                  name="projects"
                  value={data.projects}
                  className={style.formcontrol}
                  required
                  type="text"
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>hardSkills :</label>
              </div>
              <div className="col-sm-3">
                <input
                  name="hardSkills"
                  value={data.hardSkills}
                  className={style.formcontrol}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-sm-3">
                <label>softSkills :</label>
              </div>
              <div className="col-sm-3">
                <input
                  name="softSkills"
                  value={data.softSkills}
                  className={style.formcontrol}
                  type="text"
                  required
                  onChange={(e) => handelSubmet(e)}
                />
              </div>
            </div>
            <Row className="m-0">
              <div className="col-sm-1 w-100" id={style.col}>
                <label className="mb-1 ">isIntern</label>
                <Switch
                  color="default"
                  value={data.isEmployee}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      isEmployee: e.target.checked,
                      isIntern: !e.target.checked,
                    }));
                  }}
                />
                <label>isEmployee</label>
              </div>
            </Row>
            <div className="row m-0">
              <div className="col-sm-3"></div>
              <div className="col-sm-3">
                <input type="submit" className={style.button} value="add" />
              </div>
            </div>
          </div>
        </div>
        {show && <Modal close={setShow} content={content} />}
      </form>
    </>
  );
};

export default Add;
