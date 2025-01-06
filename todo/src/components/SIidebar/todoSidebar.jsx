import React from "react";
import TodoBody from "../../pages/Dashboard/todoDashboard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalStoreContext } from "../../store/GlobalContextProvider.jsx";
import { toast } from "react-toastify";

export default function TodoDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed
  const [cookie, removeCookie] = useCookies(["userid"]);
  const { dispatch } = useContext(GlobalStoreContext);
  const handleAddTaskClick = () => {
    dispatch({ type: "toggleAddTask" }); // Dispatch the action to toggle the form
  };
  function handlesignout() {
    removeCookie("userid");
    navigate("/");
    toast.success("log out successfully");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid d-flex p-0">
      {/* Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${isSidebarOpen ? "show " : " "}`}
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling "
        aria-labelledby="offcanvasScrollingLabel"
        style={{
          width: "15%",
          backgroundColor: " rgb(250, 121, 92)",
          color: "white",
          display: isSidebarOpen ? "block" : "none",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Todooo
          </h5>
          <button
            type="button"
            className="  btn-close text-reset "
            style={{ color: "white" }}
            onClick={toggleSidebar}
            aria-label="close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <button
              className="btn w-100 text-start text-white fw-bold ps-0"
              onClick={handleAddTaskClick}
            >
              {" "}
              <i className="bi bi-journal-plus me-2 fw-bold border-0"></i>
              Add Task
            </button>
            <button className="btn w-100 text-start text-white fw-bold ps-0 ">
              {" "}
              <i className="bi bi-search me-2"></i>
              Search
            </button>

            <button className="btn w-100 fw-bold text-white  ps-0  text-start ">
              <i className="bi bi-gear me-2"></i>settings
            </button>
          </div>
          <div className="mt-5">
            <h5>
              {cookie["userid"]}
              <span
                className="btn bi bi-box-arrow-right text-decoration-none text-white border-0"
                onClick={handlesignout}
              ></span>
            </h5>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="container-fluid"
        id="sidebody"
        style={{
          width: isSidebarOpen ? "85%" : "100%",
          marginLeft: isSidebarOpen ? "15%" : "0",
          transition: "margin-left 0.3s, width 0.3s",
        }}
      >
        {/* Conditionally render the button and additional div inline */}
        <div className="d-flex align-items-start mb-3">
          {!isSidebarOpen && (
            <button
              className="btn  p-0 mt-4"
              type="button"
              onClick={toggleSidebar}
              id="closebtn"
            >
              {isSidebarOpen ? (
                "Close Sidebar"
              ) : (
                <span
                  className="bi bi-arrow-bar-right text-white fw-bold "
                  style={{ fontSize: "150%" }}
                ></span>
              )}
            </button>
          )}
          {/* Inline div next to the button */}
          <TodoBody />
        </div>
      </div>
    </div>
  );
}
