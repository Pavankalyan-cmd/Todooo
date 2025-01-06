import { useFormik } from "formik";
import "../components/todopopup.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SuccessPopup from "./popupcomponents/successpopup";

export default function TodoDeletePopup(props) {
  const [cookie] = useCookies(["userid"]);
  const [Appointment, setAppointment] = useState([
    {
      AppointmentId: 0,
      Title: "",
      Description: "",
      Date: "",
      userId: "",
    },
  ]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  let navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    props.onCancel(); // Call the onCancel function passed as a prop
    console.log(props.appointmentId);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4004/get-appointment/${props.appointmentId}`)
      .then((res) => {
        setAppointment(res.data);
      });
  }, [props.appointmentId]);

  const formik = useFormik({
    initialValues: {
      AppointmentId: Appointment[0]?.AppointmentId || "", // Use optional chaining and fallback
      Title: Appointment[0]?.Title || "",
      Description: Appointment[0]?.Description || "",
      Date: Appointment[0]?.Date || "",
      userId: cookie["userid"],
    },
    onSubmit: (task) => {
      axios
        .put(
          `http://127.0.0.1:4004/edit-appointment/${props.appointmentId}`,
          task
        )
        .then(() => {
          //   alert("appointment edited successfully");

          setShowSuccessPopup(true);

          setTimeout(() => {
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
                  color: "grey",
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
                  color: "grey",
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
                  color: "grey",
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
              className="btn mx-2"
              id="taskcancelbtn"
              onClick={handleCancel}
            >
              {" "}
              cancel
            </button>

            <button className="btn " id="taskbtn" type="submit">
              {" "}
              save
            </button>
          </div>
        </form>
      </div>
      <div>
        {showSuccessPopup && (
          <SuccessPopup onClose={() => setShowSuccessPopup(false)}>
            <p className="text-success">Task edited successfully</p>
          </SuccessPopup>
        )}

        {props.trigger ? "" : null}
      </div>
    </div>
  ) : null;
}
