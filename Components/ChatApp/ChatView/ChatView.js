import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "50px",
    width: "calc(100% - 300px)",
    position: "absolute",
    position: "relative",
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  chatHeader: {
    width: "calc(100% - 301px)",
    height: "50px",
    backgroundColor: "#344195",
    position: "fixed",
    marginLeft: "301px",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "10px",
    boxSizing: "border-box",
  },
  endref: {
    backgroundColor: "red",
    bottom: "0",
    position: "absolute",
  },
}));

function ChatView(props) {
  const { chats, userEmail, selectedChatIndex } = props;
  const styles = useStyles();

  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chats]);

  if (chats === undefined) {
    return (
      <main className={classes.content}>
        <div ref={divRef} id={"divRef"}>
          dd
        </div>
      </main>
    );
  } else if (chats !== undefined) {
    return (
      <div>
        <div className={styles.chatHeader}>
          Your conversation with{" "}
          {chats[selectedChatIndex]
            ? chats[selectedChatIndex].users.filter(
                (_usr) => _usr !== userEmail
              )[0]
            : null}
        </div>
        <main className={styles.content}>
          <div>
            {chats.length > 0 && chats[selectedChatIndex].messages
              ? chats[selectedChatIndex].messages.map((_msg, _index) => {
                  //console.log(_index);
                  return (
                    <div
                      key={_index}
                      className={
                        _msg.sender === userEmail
                          ? styles.friendSent
                          : styles.userSent
                      }
                      id={
                        chats[selectedChatIndex].messages.length - 1 == _index
                          ? "divRef"
                          : ""
                      }
                      ref={
                        chats[selectedChatIndex].messages.length - 1 == _index
                          ? divRef
                          : null
                      }
                    >
                      {_msg.message}
                    </div>
                  );
                })
              : null}
          </div>
          <div ref={divRef} id={"divRef"} className={styles.endref}></div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="chatview-container">
        Loading...
        <div ref={divRef} id={"divRef"}>
          dd
        </div>
      </div>
    );
  }
}
export default ChatView;
