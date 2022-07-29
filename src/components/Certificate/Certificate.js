import React from "react";
import { Row } from "react-bootstrap";
import style from "./Pdf.module.css";
import Pdf from "react-to-pdf";
import { useSelector } from "react-redux/es/exports";

const Certificate = () => {
  const member = useSelector((state) => state.member);
  console.log(member);
  const ref = React.createRef();
  const options = {
    orientation: "Portrait ",
    unit: "px",
    format: [400, 400],
  };
  return (
    <>
      <Pdf
        targetRef={ref}
        filename={`Crtificates ${member.firstName} ${member.lastName} FocalX.pdf`}
        options={options}
        x={27}
        y={20}
        scale={0.5}
      >
        {({ toPdf }) => (
          <button onClick={toPdf} className={style.btn}>
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div className={style.pdf} ref={ref}>
        <Row className="m-0">
          <div className="col-sm-3 p-5 ">
            <h1 className={style.hadding}>INTERNSHEP CERTIFICATE</h1>
          </div>
          <div className="col-sm-5"></div>
          <div className="col-sm-4 p-5">
            <img className={style.image} src="img/img.svg" alt="logo" />
          </div>
        </Row>
        <Row className="m-0">
          <div className="col-sm-7 p-5">
            <p className={style.paragraph}>This is to certify that</p>
            <h1>
              {member.firstName} {member.lastName}
            </h1>
            <p className={style.paragraph}>
              successfully completed three months internship program and received passing grades for certificate in
            </p>
            <h1>{member.specification} </h1>
            <p className={style.paragraph}>
              a program offered by <b>focal X agency.</b>
            </p>
          </div>
          <div className="col-sm-5">
            <div className={style.back}>
              {/* <img id="pattern" src={require("../img/focal X - Halftone Pattern.svg").default} alt='photo'/> */}
            </div>
          </div>
        </Row>
        <Row className="m-0">
          <div className="col-sm-6 px-5">
            <Row>
              <div className="col-sm-3 ">
                <img className={style.qr} />
              </div>
              <div className="col-sm-8">
                <h6 className="mt-2">Scan To Search</h6>
                <p className="m-1">Issued May 2022</p>
                <p className="m-0">VALID CERTIFICATE ID</p>
                <p className="mb-4">{member.generatedId}</p>
              </div>
            </Row>
          </div>
          <div className="col-sm-2 "></div>
          <div className="col-sm-4 mt-4 ">
            <Row className="m-0">
              <div className="col-sm-6 mt-4">
                <h4>Alaa Drebate </h4>
                <p className={style.head}>Head of internship </p>
              </div>
              <div className="col-sm-6 mt-4">
                <h4>Alaa Darwish</h4>
                <p className={style.head}>Founder & CEO</p>
              </div>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Certificate;
