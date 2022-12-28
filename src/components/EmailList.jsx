import {
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  KeyboardHide,
  LocalOffer,
  MoreVert,
  People,
  Redo,
  Settings,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const EmailList = () => {
  const [email, setEmail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mailQuery = query(
        collection(db, "emails"),
        orderBy("timestamp", "desc")
      );

      onSnapshot(mailQuery, (querySnapshot) => {
        setEmail(
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
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDown />
          </IconButton>
          <IconButton>
            <Redo />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        <div className="emailList__settingRight">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <IconButton>
            <ChevronRight />
          </IconButton>
          <IconButton>
            <KeyboardHide />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section Icon={Inbox} title="Primary" color="red" selected />
        <Section Icon={People} title="Social" color="#1A73E8" />
        <Section Icon={LocalOffer} title="Promotions" color="green" />
      </div>
      <div className="emailList__list">
        {email.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            message={message}
            time={timestamp ? timestamp.toDate().toString() : null}
            // time={new Date(timestamp.toDate()).toString()}
            // time={new Date(timestamp.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;
