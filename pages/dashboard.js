import React from "react";
import { useRequireAuth } from "../Firebase/useRequireAuth";
import Loading from "../Components/Global/Loader";
import { Button } from "@material-ui/core";
import ChatApp from "../Components/ChatApp/ChatApp";
function dashboard() {
  const auth = useRequireAuth();

  if (!auth.user) {
    return <Loading />;
  }
  return (
    <div>
      <ChatApp auth={auth} />
    </div>
  );
}

export default dashboard;
