import { useFormik } from "formik";
import "../components/todopopup.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "./popupcomponents/successpopup";
import { useState } from "react";

export default function TodoPopup(props) {
  const [cookie] = useCookies(["userid"]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [textt, settextt] = useState("");

  let navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    props.onCancel(); // Call the onCancel function passed as a prop
  };
  const formik = useFormik({
    initialValues: {
      AppointmentId: 0,
      Title: "",
      Description: "",
      Date: "",
      userId: cookie["userid"],
    },
    onSubmit: (appointment) => {
      axios
        .post("http://127.0.0.1:4004/add-appointment", appointment)
        .then(() => {
          setShowSuccessPopup(true);
          settextt("task added sucessfully");
          setTimeout(() => {
            setShowSuccessPopup(false);
            navigate("/home");
            window.location.reload();
          }, 1000);
        });
    },
  });
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dd>
              <input
                type="number"
                name="AppointmentId"
                placeholder="Taskid"
                className="form-control"
                id="taskid"
                style={{
                  border: "0px",
                  backgroundColor: "rgb(40,40,40)",
                  color: "white",
                }}
                onChange={formik.handleChange}
              ></input>
            </dd>
            <dd>
              <input
                type="text"
                name="Title"
                placeholder="Task name"
                className="form-control"
                id="taskname"
                style={{
                  border: "0px",
                  backgroundColor: "rgb(40,40,40)",
                  color: "white",
                }}
                onChange={formik.handleChange}
              ></input>
            </dd>
            <dd>
              <textarea
                type="text"
                name="Description"
                placeholder="Description"
                className="form-control"
                id="description"
                style={{
                  border: "0px",
                  backgroundColor: "rgb(40,40,40)",
                  color: "white",
                }}
                onChange={formik.handleChange}
              ></textarea>
            </dd>
            <dd>
              <input
                type="date"
                name="Date"
                className="form-control"
                id="duedate"
                style={{
                  border: "0px",
                  backgroundColor: "rgb(40,40,40)",
                  color: "grey",
                }}
                onChange={formik.handleChange}
              />
            </dd>
          </dl>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn mx-2 "
              id="taskcancelbtn"
              onClick={handleCancel}
            >
              {" "}
              cancel
            </button>

            <button className="btn" id="taskbtn" type="submit">
              {" "}
              Add task
            </button>
          </div>
        </form>
      </div>
      <div>
        {showSuccessPopup && (
          <SuccessPopup>
            <p className="text-success">
              <span className="bi bi-check text-success"></span>
              {textt}
            </p>
          </SuccessPopup>
        )}

        {props.trigger ? "" : null}
      </div>
    </div>
  ) : null;
}
