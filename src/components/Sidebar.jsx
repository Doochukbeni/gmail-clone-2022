import {
  AccessTime,
  Add,
  Duo,
  ExpandMore,
  Inbox,
  LabelImportant,
  NearMe,
  Note,
  Person,
  Phone,
  Star,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../features/mailSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    return dispatch(openSendMessage());
  };
  const [emailCount, setEmailCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mailQuery = query(collection(db, "emails"));

      onSnapshot(mailQuery, (querySnapshot) => {
        setEmailCount(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };

    fetchData();
  }, []);
  return (
    <div className="sidebar">
      <Button
        startIcon={<Add style={{ fontSize: "x-large" }} />}
        className="sidebar__compose"
        onClick={handleClick}
      >
        Compose
      </Button>
      <SidebarOption
        Icon={Inbox}
        title="Inbox"
        number={emailCount.length}
        selected={true}
      />
      <SidebarOption Icon={Star} title="Starred" number={13} />
      <SidebarOption Icon={AccessTime} title="Snoozed" number={54} />
      <SidebarOption Icon={LabelImportant} title="Important" number={54} />
      <SidebarOption Icon={NearMe} title="sent" number={54} />
      <SidebarOption Icon={Note} title="Drafts" number={54} />
      <SidebarOption Icon={ExpandMore} title="More" number={54} />
      <div className="sidebar__footer">
        <div className="sidebar__footerIcons">
          <IconButton>
            <Person />
          </IconButton>
          <IconButton>
            <Duo />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
