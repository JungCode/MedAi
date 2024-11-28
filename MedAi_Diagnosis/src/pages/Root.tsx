import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"; // Import the image

export default function Root() {
  return (
    <div className="flex relative">
      <nav className="px-3 flex flex-col shadow-xl fixed h-screen bg-white rounded-xl">
        <div className="h-56 text-orange-700 font-bold">
          <div className="w-12 pt-3">
            <img src={logo} className="w-full h-full" alt="" />
          </div>
        </div>
        <ul className="">
          <li className="py-3 rounded-xl mt-3 ">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-zinc-800 px-4 py-3 rounded-xl mt-3 text-white transition-all duration-300"
                  : "px-4 py-3 rounded-xl mt-3"
              }
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </NavLink>
          </li>
          <li className="py-3 rounded-xl mt-3">
            <NavLink
              to="Chatbot"
              className={({ isActive }) =>
                isActive
                  ? "bg-zinc-800 px-4 py-3 rounded-xl mt-3 text-white transition-all duration-300"
                  : "px-4 py-3 rounded-xl mt-3"
              }
            >
              <FontAwesomeIcon icon={faComment} className="text-xl" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div id="detail" className="flex w-full">
        <Outlet />
      </div>
    </div>
  );
}
