import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  listItem: {
    cursor: "pointer",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
}));

function ChatList(props) {
  const styles = useStyles();
  const { auth, chats, userEmail, selectedChatIndex, selectChat } = props;
  console.log(props);
  const newChat = () => {
    console.log("new chat");
  };

  const userIsSender = (chat) => {
    console.log(
      chat.messages[chat.messages.length - 1].sender,
      "-    - ",
      userEmail
    );
    chat.messages[chat.messages.length - 1].sender == userEmail;
  };

  return (
    <div>
      <main className={styles.root}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className={styles.newChatBtn}
          onClick={() => {
            newChat();
          }}
        >
          New Chat
        </Button>
        {chats.length > 0
          ? chats.map((_chat, _index) => (
              // Only do this if items have no stable IDs

              <div key={_index}>
                <ListItem
                  onClick={() => selectChat(_index)}
                  className={styles.listItem}
                  selected={selectedChatIndex === _index}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">
                      {
                        _chat.users
                          .filter((_user) => _user !== userEmail)[0]
                          .split("")[0]
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      _chat.users.filter((_user) => _user !== userEmail)[0]
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" color="textPrimary">
                          {_chat.messages
                            ? _chat.messages[
                                _chat.messages.length - 1
                              ].message.substring(0, 30) + " ..."
                            : null}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {_chat.receiverHasRead === false && userIsSender(_chat) ? (
                    <ListItemIcon>
                      <NotificationImportant
                        className={styles.unreadMessage}
                      ></NotificationImportant>
                    </ListItemIcon>
                  ) : null}
                </ListItem>
                <Divider />
              </div>
            ))
          : null}
        <Button
          onClick={() => {
            auth.signout();
          }}
          fullWidth
          variant="contained"
          color="secondary"
        >
          signOut
        </Button>
      </main>
    </div>
  );
}

export default ChatList;
