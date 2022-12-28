import {
  Apps,
  ArrowDropDown,
  Menu,
  Notifications,
  Search,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <Menu />
        </IconButton>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHPvzlyZHIuUIQzOttZQcBHyBhOJ6guHm1g&usqp=CAU"
          alt="gmail-logo"
        />
      </div>
      <div className="header__middle">
        <Search />
        <input type="text" placeholder="search mail" />
        <ArrowDropDown className="header__inputCaret" />
      </div>
      <div className="header__right">
        <IconButton>
          <Apps />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <Avatar
          onClick={logOut}
          src={user ? user.photoUrl : user.name[0]}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Header;
