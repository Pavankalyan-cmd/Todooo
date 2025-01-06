import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function TodoSignup() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: "",
      userName: "",
      Email: "",
      Password: "",
      Mobile: "",
    },

    onSubmit: (user) => {
      axios
        .post("http://127.0.0.1:4004/register-user", user)
        .then(() => {
          toast.success("User Registered successfully");
          navigate("/login");
        })
        .catch((error) => {
          console.error("There was an error registering the user!", error);
          alert("Failed to register user: " + error.message);
        });
    },
  });
  return (
    <div>
      <div className="d-flex mx-5 mt-4  ">
        <img
          src="https://i.postimg.cc/fLdDxvQM/logo-removebg-preview.png"
          id="logo2"
          alt="logo2"
        ></img>
        <h2 id="logoTittle2">Todooo</h2>
      </div>
      <div className="container-fluid d-flex justify-content-around ">
        <div className="px-5 my-5" id="Login1">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="my-3"> sign up</h1>
            <dl>
              <dt className="my-2">userId</dt>
              <dd>
                <input
                  className="form-control"
                  type="text"
                  name="userId"
                  placeholder="Enter userId..."
                  onChange={formik.handleChange}
                ></input>
              </dd>
              <dt className="my-2">Username</dt>
              <dd>
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  placeholder="Enter Username..."
                  onChange={formik.handleChange}
                ></input>
              </dd>{" "}
              <dt className="my-2">Email</dt>
              <dd>
                <input
                  className="form-control"
                  type="email"
                  name="Email"
                  placeholder="Enter your Email..."
                  onChange={formik.handleChange}
                ></input>
              </dd>{" "}
              <dt className="my-2">Password</dt>
              <dd>
                <input
                  className="form-control"
                  type="password"
                  name="Password"
                  placeholder="Enter your Password..."
                  onChange={formik.handleChange}
                ></input>
              </dd>
              <dt className="my-2">Mobile</dt>
              <dd>
                <input
                  className="form-control "
                  type="text"
                  name="Mobile"
                  placeholder="Enter your Mobilenumber..."
                  onChange={formik.handleChange}
                ></input>
              </dd>
            </dl>
            <button className="btn w-100 p-2" id="Loginbtn" type="submit">
              {" "}
              Sign up with Email{" "}
            </button>
          </form>
          <hr></hr>
          <p className="text-center">
            Already signed up?{" "}
            <Link type="button" to="/login">
              Go to Login
            </Link>
          </p>
        </div>
        <div className="my-5" id="Login2">
          <img
            src="https://i.postimg.cc/tgdPRF7m/DALL-E-2024-11-12-16-22-43-Create-a-professional-and-visually-appealing-illustration-to-enhance-a.webp"
            id="Loginimg"
          ></img>
        </div>
      </div>
    </div>
  );
}
