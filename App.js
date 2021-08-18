/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 05-08-2021
 * @desc [description]
 */

import React, { useState } from "react";
import RootStack from "./navigators/RootStack";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./components/CredentialsContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("UserData")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={(error) => console.log("hello" + error)}
      />
    );
  }

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <RootStack />
    </CredentialsContext.Provider>
  );
}
