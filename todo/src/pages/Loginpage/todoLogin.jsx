import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function TodoLogin() {
  const [cookie, setCookie] = useCookies(["userid"]);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: "",
      Password: "",
    },
    onSubmit: (user) => {
      axios.get("http://127.0.0.1:4004/users").then((res) => {
        var userdetail = res.data.find((u) => u.userId === user.userId);
        if (userdetail) {
          if (userdetail.Password === user.Password) {
            setCookie("userid", user.userId);
            navigate("/home");
            toast.success("log in successfully");
          } else {
            toast.error("invalid password");
          }
        } else {
          toast.error("invalid username");
        }
      });
    },
  });
  return (
    <div>
      <div className="d-flex mx-5 mt-4">
        <img
          src="https://i.postimg.cc/fLdDxvQM/logo-removebg-preview.png"
          id="logo2"
          alt="logo2"
        ></img>
        <h2 id="logoTittle2">Todooo</h2>
      </div>
      <div className="container-fluid d-flex justify-content-around ">
        <div className="px-5 " id="Signup1">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="my-3"> Log in</h1>
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
            </dl>
            <button className="btn w-100 p-2" id="Loginbtn" type="submit">
              {" "}
              Log in{" "}
            </button>
          </form>
          <hr></hr>
          <p className="text-center">
            Don’t have an account?{" "}
            <Link type="button" to="/signup">
              {" "}
              Sign up{" "}
            </Link>
          </p>
        </div>
        <div id="Login2">
          <img
            src="https://i.postimg.cc/76k3gw5h/DALL-E-2024-11-12-17-51-33-Create-a-professional-and-realistic-illustration-of-a-digital-workspace.webp"
            id="Loginimg"
            alt="img"
          ></img>
        </div>
      </div>
    </div>
  );
}
