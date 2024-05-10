import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

const Header = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-foods"> Available Foods</NavLink>
      </li>
      <li>
        <NavLink to="/add-food">Add Food</NavLink>
      </li>
      <li>
        <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
      </li>
      <li>
        <NavLink to="/my-food-request">My Food Request</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CiMenuBurger />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="cursor-pointer text-2xl font-bold text-stone-700">
            Nourish<span className="  text-amber-600">4</span>All
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
