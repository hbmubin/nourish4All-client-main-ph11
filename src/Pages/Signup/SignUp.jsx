import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const { createUser, user, googleLogin, githubLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSignUp = (e) => {
    e.preventDefault();
    const regularExpression =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be 6 or longer",
      });
      return;
    }
    if (!regularExpression.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password should contain atleast one number and one special character",
      });
      return;
    }
    createUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SignUp Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            e.target.reset();
            navigate("/");
          })
          .catch();
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
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
    });
  };
  return (
    <div>
      <Helmet>
        <title>SignUp || Nourish4All</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex flex-col">
          <h1 className="text-5xl font-bold mb-12">SignUp now!</h1>
          <div className="card w-96 shadow-xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  name="photo"
                  required
                />
              </div>
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
                  SignUp
                </button>
              </div>
              <div className="text-sm">
                Already have an account ?
                <Link
                  className="text-blue-600 font-semibold ml-1 underline"
                  href="/login"
                >
                  Login
                </Link>
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
