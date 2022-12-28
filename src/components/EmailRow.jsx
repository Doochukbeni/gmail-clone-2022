import {
  LabelImportantOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMail } from "../features/mailSlice";
import "./EmailRow.css";

const EmailRow = ({ title, subject, message, time, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(selectMail({ title, subject, message, time, id }));
    navigate("/mail");
  };
  return (
    <div onClick={openMail} className="emailRow">
      <div className="emailRow__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton>
          <LabelImportantOutlined />
        </IconButton>
      </div>
      <h3 className="emailRow__title">{title}</h3>
      <div className="emailRow__message">
        <h4>
          {subject} <span className="emailRow__description">- {message}</span>
        </h4>
      </div>
      <p className="emailRow__time">{time} </p>
    </div>
  );
};

export default EmailRow;
