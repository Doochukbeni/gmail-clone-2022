import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import "./SendMail.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SendMail = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((mail) => {
    try {
      addDoc(collection(db, "emails"), {
        to: mail.to,
        subject: mail.subject,
        message: mail.message,
        timestamp: serverTimestamp(),
      });

      dispatch(closeSendMessage());
    } catch (error) {
      console.log(error.message);
    }
    console.log(mail);
  });
  //
  // const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <Close
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="To"
          {...register("to", {
            required: true,
          })}
        />
        {errors.to && <p className="sendMail__errors">To Is Required</p>}
        <input
          type="text"
          placeholder="Subject"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail__errors">subject is required </p>
        )}
        <input
          type="text"
          placeholder="message"
          className="sendMail__message"
          {...register("message", { required: "please enter the message" })}
        />
        {errors.message && (
          <p className="sendMail__errors">Message Is Required</p>
        )}

        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
