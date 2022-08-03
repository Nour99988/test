import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.loadercontainer}>
      <p className={style.loadingText}>Loading</p>
    </div>
  );
};

export default Loading;
