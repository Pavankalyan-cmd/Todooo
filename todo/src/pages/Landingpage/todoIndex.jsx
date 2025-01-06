import { Link } from "react-router-dom";

export default function TodoIndex() {
  return (
    <div className="container-fluid ">
      <nav className="nav navbar d-flex justify-content-between  ;" id="nav1">
        <div className="d-flex mt-2 w-50 mx-5 ">
          <img
            src="https://i.postimg.cc/fLdDxvQM/logo-removebg-preview.png"
            alt="logo"
            id="logo"
          ></img>
          <h4 className="mt-2" id="logoTittle">
            Todooo
          </h4>
        </div>
        <div className="d-flex  mt-2 mx-4">
          <Link className="btn mx-2 " id="Login" to="/login" type="button">
            Log in
          </Link>
          <Link className="btn " id="signup" to="/signup" type="button">
            start for free
          </Link>
        </div>
      </nav>
      <div className="container-fluid  d-flex w-100 " id="home">
        <div className="home1 p-5">
          <h1>
            Elevate Your Everyday
            <br /> Task Management Made Simple!
          </h1>
          <p id="des">
            Elevate your productivity with Todooo, the ultimate task management
            website. Simplify your life and conquer your goals with ease!
          </p>
          <Link className="btn p-3  " id="btn2" to="/signup">
            {" "}
            start for free{" "}
          </Link>
        </div>
        <div className="home2">
          <img
            src="https://i.postimg.cc/wxw1S1LH/DALL-E-2024-11-11-23-49-27-Design-a-professional-and-modern-homepage-image-for-a-to-do-list-websit.webp"
            alt="homepage"
            id="img1"
          ></img>
        </div>
      </div>
    </div>
  );
}
