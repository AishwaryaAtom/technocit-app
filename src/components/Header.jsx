import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  const { user,setUser } = useUser();
    const navigate = useNavigate();
   
    const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-between align-items-center shadow-sm border-b border-gray-200 mb-1 px-4">
      <h1 className="h4 fw-bold">{props.title}</h1>

      {user && (
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center bg-white border-white"
          >
            <img
              src="/img/profile.png"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "32px", height: "32px" }}
            />
            <span>{user.name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout} className="text-danger">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default Header;

