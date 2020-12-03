import React, { useState, useEffect } from "react";

import firebase from "../../Firebase/firebase";

import ChatList from "./ChatList/ChatList";
import ChatView from "./ChatView/ChatView";
import ChatInputField from "./ChatInputField/ChatInputField";
function ChatApp({ auth }) {
  const [selectedChat, setselectedChat] = useState(0);
  const [newChatFormVisible, setnewChatFormVisible] = useState(false);
  const [email, setemail] = useState(null);
  const [friends, setfriends] = useState([]);
  const [chats, setchats] = useState([]);

  const selectChat = (index) => {
    console.log("Selected chat", index);
    setselectedChat(index);
  };
  const newChatBtnClicked = () => {
    console.log("new chat button clicked");
  };
  const submitMessage = (msg) => {
    const docKey = buildDocKey(
      chats[selectedChat].users.filter((_usr) => _usr !== email)[0]
    );
    console.log(chats[selectedChat].users.filter((_usr) => _usr !== email)[0]);
    console.log(docKey);
    firebase
      .firestore()
      .collection("chatsdb")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  // Always in alphabetical order:
  // 'user1:user2'
  const buildDocKey = (friend) => [friend, email].sort().join(":");
  useEffect(() => {
    const unsubsribe = firebase
      .firestore()
      .collection("chatsdb")
      .where("users", "array-contains", auth.user.email)
      .onSnapshot(async (res) => {
        const _chats = res.docs.map((_doc) => _doc.data());

        await setchats(_chats);
        setfriends([]);
        await setemail(auth.user.email);
      });
    return () => {
      unsubsribe;
    };
  }, [email]);
  return (
    <div>
      <ChatList
        newChatBtn={newChatBtnClicked}
        selectChat={selectChat}
        chats={chats}
        userEmail={email}
        selectedChatIndex={selectedChat}
        auth={auth}
      />
      <ChatView
        chats={chats}
        userEmail={email}
        selectedChatIndex={selectedChat}
      />
      {selectedChat !== null ? (
        <ChatInputField
          //   userClickedInputFn={messageRead}
          submitMessageFn={submitMessage}
        ></ChatInputField>
      ) : null}
    </div>
  );
}

export default ChatApp;
