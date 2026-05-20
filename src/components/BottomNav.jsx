import { Link, useLocation } from "react-router-dom";

import {
  MdHomeFilled,
  MdBarChart,
  MdAdd,
  MdReceiptLong
} from "react-icons/md";

import "./BottomNav.css";

function BottomNav() {

  const location = useLocation();

  return (

    <div className="bottom-nav">

      <Link
        to="/"
        className={
          location.pathname === "/"
            ? "active"
            : ""
        }
      >

        <MdHomeFilled size={24} />

        <span>Home</span>

      </Link>

      <Link
        to="/transactions"
        className={
          location.pathname ===
            "/transactions"
            ? "active"
            : ""
        }
      >

        <MdReceiptLong size={24} />

        <span>Transactions</span>

      </Link>

      <Link
        to="/add"

        className={
          location.pathname === "/add"

            ? "add-btn active-add"

            : "add-btn"
        }
      >

        <MdAdd size={30} />

      </Link>

      <Link
        to="/analytics"
        className={
          location.pathname ===
            "/analytics"
            ? "active"
            : ""
        }
      >

        <MdBarChart size={24} />

        <span>Analytics</span>

      </Link>

    </div>

  );
}

export default BottomNav;