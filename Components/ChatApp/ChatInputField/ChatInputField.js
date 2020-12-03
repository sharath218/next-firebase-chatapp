import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "15px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
}));
function ChatInputField(props) {
  const styles = useStyles();
  const [chatText, setchatText] = useState("");
  const { submitMessageFn } = props;
  const userTyping = (e) =>
    e.keyCode === 13 ? submitMessage() : setchatText(e.target.value);
  const messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
  //   const  userClickedInput = () => userClickedInputFn();
  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      document.getElementById("chattextbox").value = "";
    }
  };
  return (
    <div className={styles.chatTextBoxContainer}>
      <TextField
        placeholder="Type your message.."
        onKeyUp={(e) => userTyping(e)}
        id="chattextbox"
        className={styles.chatTextBox}
        //onFocus={userClickedInput}
      ></TextField>
      <Send onClick={() => submitMessage} className={styles.sendBtn}></Send>
    </div>
  );
}

export default ChatInputField;
