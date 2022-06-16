import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
  Chat,
  ChatOutlined,
  NotificationImportant,
  NotificationImportantOutlined,
  
} from "@mui/icons-material";
import { Button, Dialog, Menu, MenuList } from "@mui/material";

const Header = () => {
  const [notifications, setNotifications] = useState(false);
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
      <Link to="/messenger" onClick={() => setTab("/messenger")}>
        {tab === "/messenger" ? (
          <Chat style={{ color: "black" }} />
        ) : (
          <ChatOutlined />
        )}
      </Link>
      
      <Button onClick={() => setNotifications(!notifications)}>
          <NotificationImportant/>

      </Button>
      <Dialog open={notifications} onClose={() => setNotifications(!notifications)} >
          <div> Helllo </div>
      </Dialog>

    </div>
  );
};

export default Header;