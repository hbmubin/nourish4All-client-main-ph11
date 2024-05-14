import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Lottle from "lottie-react";
import foodtop from "../../../public/foodtop.json";

const Header = () => {
  const { logOut, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch();
  };
  const links = (
    <>
      <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
        <NavLink className="font-semibold py-3" to="/">
          Home
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
        <NavLink className="font-semibold py-3" to="/available-foods">
          Available Foods
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
        <NavLink className="font-semibold py-3" to="/add-food">
          Add Food
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
        <NavLink className="font-semibold py-3" to="/manage-my-foods">
          Manage My Foods
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
        <NavLink className="font-semibold py-3" to="/my-food-request">
          My Food Request
        </NavLink>
      </motion.li>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar bg-base-100 py-6">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CiMenuBurger size={27} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            href="/"
            className="cursor-pointer text-3xl font-bold text-stone-700"
          >
            Nourish
            <span className="  text-amber-600">4</span>
            All
          </motion.a>
          <div className="w-12 mb-2">
            <Lottle loop={true} animationData={foodtop} />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          {loading && (
            <span className="loading loading-ring -translate-x-16 loading-lg"></span>
          )}
          {!user ? (
            <>
              {!loading && (
                <>
                  <NavLink
                    to="/login"
                    className="btn  bg-stone-500 hover:bg-stone-600 text-white"
                  >
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="btn">
                    SignUp
                  </NavLink>
                </>
              )}
            </>
          ) : (
            <>
              <div
                className="avatar cursor-pointer tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 rounded-xl"
                >
                  <img src={user.photoURL} />
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogOut}
                className="btn"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
