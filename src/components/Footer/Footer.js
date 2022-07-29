import React from "react";
import {Container, Row} from "reactstrap";
import style from "./Footer.module.css";



const Footer = () => {
  return(
      <>
     {/* <footer className={style.footer}>
     
       <Container fluid>
       <Row>
         <div className="col-lg-3 col-md-3 p-0">
         <span className={style.join}><b>join Us :</b>hr@focal-x.com</span>
         </div>
         <div className=" col-lg-2 col-md-1"></div>
         <div className=" col-lg-7 col-md-8">
         
        <div className={style.footr}>
        <div className="row" style={{width:'100%'}}>
        <div className=" col-lg-7 col-md-7 p-0 ">
        <span className={style.care}><b>Customer Care : </b>info@focal-x.com</span>
         </div>
         <div className="col-lg-5 col-md-4 p-0">
           <span className={style.textRight}> +963 951 897 739</span>
         </div>
        </div>
        </div>
         </div>
         </Row>
       </Container>
     </footer> */}
      <div className={style.contenar}>
           <footer className={style.footer}>
           <div className={style.contact}>
           <p>
            <span><b>Join US :</b> hr@focal-x.com</span>
          </p>
          </div>
          <div className={style.contents}>
            <p>
              <span><b>Customer Care :</b> info@focal-x.com  </span> | <span className={style.spans}> +963 951 897 739</span>
            </p>
          </div>
           </footer>
      </div>

      </>
    )
 
};

export default Footer;
