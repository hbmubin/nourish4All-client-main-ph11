import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignUp = () => {
  const { loginUser, user, googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "email or password doesn't match",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleLogin = () => {
    if (user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    googleLogin().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location?.state ? location.state : "/");
    });
  };
  const handleGithubLogin = () => {
    if (user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    githubLogin().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location?.state ? location.state : "/");
    });
  };
  return (
    <div>
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content flex flex-col">
          <h1 className="text-5xl font-bold mb-12">Login now!</h1>
          <div className="card w-96 shadow-xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-amber-500 hover:bg-amber-600">
                  Login
                </button>
              </div>
              <div className="text-sm">
                New here ?
                <a
                  className="text-blue-600 font-semibold ml-1 underline"
                  href="/signup"
                >
                  SignUp
                </a>
              </div>
            </form>
            <div>
              <div className="flex justify-center items-center mb-2 gap-4 font-semibold">
                <hr className="flex-1" />
                <div>or</div>
                <hr className="flex-1" />
              </div>
              <h2 className="text-center font-semibold">Sign in with</h2>
              <div className="flex justify-center gap-6 my-4">
                <button
                  onClick={handleGoogleLogin}
                  className="hover:scale-110 hover:bg-neutral-200 p-2 rounded-full duration-300"
                >
                  <FcGoogle size={35}></FcGoogle>
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="hover:scale-110 hover:bg-neutral-200 p-2 px-3 rounded-full duration-300"
                >
                  <FaGithub size={30}></FaGithub>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
