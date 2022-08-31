import React from "react";
import style from "./User.module.css";
import { Link, NavLink } from "react-router-dom";

const Pagination = ({ postPrePage, totalPosts, Paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPrePage); i++) {
    pageNumbers.push(i);
  }
  const render = pageNumbers.map((number) => {
    return (
      <li key={number} className={"page-item"}>
        <NavLink to="" onClick={() => Paginate(number)} className="page-link">
          {number}
        </NavLink>
      </li>
    );
  });
  return (
    <div>
      <ul className={`pagination ${style.pagination}`}>{render}</ul>
    </div>
  );
};

export default Pagination;
