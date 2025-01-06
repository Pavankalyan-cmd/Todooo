import { useEffect, useState, useContext } from "react";
import TodoPopup from "../../components/todopopup.jsx";
import axios from "axios";
import { useCookies } from "react-cookie";
import TodoDeletePopup from "../../components/todoDelete.jsx";
import SuccessPopup from "../../components/popupcomponents/successpopup.jsx";
import { useNavigate } from "react-router-dom";
import { GlobalStoreContext } from "../../store/GlobalContextProvider.jsx";

export default function TodoBody(props) {
  const { store, dispatch } = useContext(GlobalStoreContext);
  const [showbtn, setShowbtn] = useState("d-block");
  const [trigger, setTrigger] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [textt, settextt] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [cookie] = useCookies(["userid"]);

  let navigate = useNavigate();

  const [Appointment, setAppointment] = useState([
    { AppointmentId: 0, Title: "", Description: "", Date: "", userId: "" },
  ]);

  const handleAddTask = () => {
    dispatch({ type: "toggleAddTask" });
    setTrigger(true);
    setShowbtn("d-none");
  };

  const handleCancel = () => {
    dispatch({ type: "toggleAddTask" });
    setTrigger(false);
    setTrigger2(false);
    setShowbtn("d-block");
  };
  function Handledelete(e) {
    axios
      .delete(`http://127.0.0.1:4004/delete-appointment/${e.target.id}`)
      .then(() => {
        settextt("task deleted successfully !");
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/home");
          window.location.reload();
        }, 1000);
      });
  }
  function Handletask(e) {
    axios
      .delete(`http://127.0.0.1:4004/delete-appointment/${e.target.id}`)
      .then(() => {
        settextt("task completed successfully !");
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/home");
          window.location.reload();
        }, 1000);
      });
  }
  const handleEditClick = (e) => {
    setSelectedAppointmentId(e.target.id);
    setTrigger2(true);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4004/get-appointment/${cookie["userid"]}`)
      .then((res) => {
        setAppointment(res.data);
      });
  }, [cookie]);
  return (
    <div className="conatiner-fluid" id="innerbody">
      <div className="innerbody">
        <h3>Today</h3>
        <hr className="w-75" style={{ color: "grey" }} />
        <div>
          {Appointment.map((app) => {
            return (
              <div key={app.AppointmentId} className="d-flex w-100">
                <div className="mx-2">
                  {" "}
                  <input
                    type="radio"
                    className="form-check-input"
                    id={app.AppointmentId}
                    name="appointment"
                    onClick={Handletask}
                  />
                </div>
                <div className="w-75">
                  {" "}
                  <div className="d-flex justify-content-between w-100">
                    <h6>{app.Title}</h6>
                    <div>
                      <span
                        className=" btn bi bi-pencil-square mx-1 border-0"
                        style={{ color: "white" }}
                        id={app.AppointmentId}
                        onClick={handleEditClick}
                      ></span>
                      <span
                        className=" btn  bi bi-trash border-0 "
                        id={app.AppointmentId}
                        onClick={Handledelete}
                        style={{ color: "white" }}
                      ></span>
                    </div>
                  </div>
                  <p style={{ fontSize: "15px" }}>{app.Description}</p>
                  <p style={{ color: "rgb(250, 121, 92)", fontSize: "13px" }}>
                    {new Date(app.Date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                    <span
                      className="bi bi-calendar-event mx-2"
                      style={{ color: "rgb(250, 121, 92);" }}
                    ></span>
                  </p>
                  <hr style={{ color: "grey", width: "100%" }} />
                </div>
              </div>
            );
          })}
        </div>
        <TodoDeletePopup
          trigger={trigger2}
          appointmentId={selectedAppointmentId}
          onCancel={handleCancel}
        />

        <button
          className={` btn text-danger text-decoration-none border-0 ${showbtn} `}
          onClick={handleAddTask}
        >
          {" "}
          <span className="bi bi-plus text-danger "> </span>
          Add task
        </button>
        <TodoPopup trigger={store.openAddTask} onCancel={handleCancel} />
      </div>
      <div>
        {showSuccessPopup && (
          <SuccessPopup onClose={() => setShowSuccessPopup(false)}>
            <p className="text-danger">
              <span className="bi bi-trash text-danger"></span>
              {textt}
            </p>
          </SuccessPopup>
        )}

        {props.trigger ? "" : null}
      </div>
    </div>
  );
}
