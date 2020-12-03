import React, { useState, useEffect, useContext, createContext } from "react";

import firebase from "./firebase";

// Add your Firebase credentials

export const auth = firebase.auth;
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        console.log("user", user);
        return response.user;
      })
      .catch((error) => {
        console.log("error.code", error);

        notify(error.message);
      });
  };

  const signup = async () => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        console.log("sign user", user);

        response.user.updateProfile({
          displayName: name,
        });
        return response.user;
      })
      .catch((error) => {
        console.log("error.code", error);

        notify(error.message);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  const setUpRecaptcha = (value) => {
    return new firebase.auth.RecaptchaVerifier(value);
  };

  const signwithmobile = (number, recaptcha) => {
    return firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((response) => {
        console.log(response);
        return response;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     window.nookies = nookies;
  //   }
  //   return firebase.auth().onIdTokenChanged(async (user) => {
  //     console.log(`token changed!`);
  //     if (!user) {
  //       console.log(`no token found...`);
  //       setUser(null);
  //       nookies.destroy(null, "token");
  //       nookies.set(null, "token", "", {});
  //       return;
  //     }

  //     console.log(`updating token...`);
  //     const token = await user.getIdToken();
  //     setUser(user);
  //     user.student = "true";
  //     nookies.destroy(null, "token");
  //     nookies.set(null, "token", token, {});
  //   });
  // }, []);

  // // force refresh the token every 10 minutes
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     console.log(`refreshing token...`);
  //     const user = firebase.auth().currentUser;
  //     if (user) await user.getIdToken(true);
  //   }, 10 * 60 * 1000);
  //   return () => clearInterval(handle);
  // }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    setUpRecaptcha,
    signwithmobile,
    auth,
  };
}
