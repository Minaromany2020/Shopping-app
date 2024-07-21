import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 w-4/5 m-auto shadow-md px-5 rounded-xl">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Shopping
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        <Link to="/cart" className="btn btn-ghost">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
