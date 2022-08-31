import React, { useEffect, useState, Fragment } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../../redux/action/employeesAction";
import style from "./User.module.css";
import { useCookies } from "react-cookie";
import Loading from "../Loading/Loading";
import { setDeleteMember } from "../../redux/action/employeesAction";
import Modal from "../Modal/Modal";
import Pagination from "./Pagination";
import { margin } from "@mui/system";

const Users = () => {
  const [cookies] = useCookies("token");
  const [show, setShow] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const [del, setDel] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [idForDel, setIdForDel] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [member, setMember] = useState([]);
  const state = useSelector((state) => state.allMembers);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPrePage, setPostPrePage] = useState(9);
  const indexOfLastPost = currentPage * postPrePage;
  const indOfFirstPost = indexOfLastPost - postPrePage;
  // const [currentPost, setCurrentPost] = useState( member.slice(indOfFirstPost, indexOfLastPost))
  const currentPost = member.slice(indOfFirstPost, indexOfLastPost);
  const Paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchEmployees = async () => {
    await axios
      .get("https://focalx-cert-generator.herokuapp.com/v1/members", {
        headers: {
          Authorization: "bearer " + cookies.token,
        },
      })
      .then((res) => dispatch(setEmployees(res.data)))
      .catch((err) => {
        setShow(true);
        setContent("cheak the intenet connection");
        setHideLoading(true);
      });
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setMember(state);
  }, [state]);

  const proupDelete = async (id, name) => {
    setIdForDel(id);
    setContent("Do You Want Remove " + name);
    setShow(true);
    setRemoveButton(true);
  };
  useEffect(() => {
    handelDelete(idForDel);
  }, [del]);
  const handelDelete = async (id) => {
    if (del === true) {
      document.body.style.cursor = "wait";
      setDel(false);
      await axios
        .delete(`https://focalx-cert-generator.herokuapp.com/v1/members/${id}`, {
          headers: {
            Authorization: "bearer " + cookies.token,
          },
        })
        .then((res) => {
          const newMembers = member.filter((mem) => mem.memberId !== id);
          setMember(newMembers);
          dispatch(setDeleteMember(newMembers));
          document.body.style.cursor = "default";
        })
        .catch((err) => {
          document.body.style.cursor = "default";
        });
    } else if (!del) {
      return;
    }
  };
  const render = currentPost.map((user) => {
    return (
      <Fragment key={user.memberId}>
        <div className="col-md-4 mt-40">
          <div className={style.card}>
            <p className={style.x} onClick={() => proupDelete(user.memberId, user.firstName)}>
              X
            </p>
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
      </Fragment>
    );
  });
  useEffect(() => {
    handelSearch();
  }, [search]);
  const handelSearch = () => {
    setCurrentPage(1);
    let reg = new RegExp(search, "ig");
    let resultSearch = state.filter((item) => {
      return (
        item.firstName.search(reg) !== -1 ||
        item.lastName.search(reg) !== -1 ||
        item.specification.search(reg) !== -1 ||
        item.generatedId.search(reg) !== -1
      );
    });
    setMember(resultSearch);
  };

  return (
    <>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={style.search} />
      <Pagination postPrePage={postPrePage} totalPosts={member.length} Paginate={Paginate} />
      {state.length ? (
        <>
          <div className="content" style={{ padding: "10px 30px", marginTop: "-25px" }}>
            <Row className="m-0">{render}</Row>
          </div>
        </>
      ) : !hideLoading ? (
        <Loading />
      ) : (
        <p className={style.faild}>please Ckeak the intenet connection and reload this page</p>
      )}
      {show && (
        <Modal
          close={setShow}
          content={content}
          removeButton={removeButton}
          setRemoveButton={setRemoveButton}
          setDel={setDel}
        />
      )}
    </>
  );
};

export default Users;
