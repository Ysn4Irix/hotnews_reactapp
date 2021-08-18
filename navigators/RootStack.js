/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 05-08-2021
 * @desc [description]
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import NewsScreen from "./../screens/NewsScreen";
import { Colors } from "../components/styles";
import { CredentialsContext } from "./../components/CredentialsContext";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTintColor: Colors.secondary,
              headerTransparent: true,
              headerTitle: "",
            }}
            initialRouteName="LoginScreen"
          >
            {storedCredentials ? (
              <Stack.Screen name="NewsScreen" component={NewsScreen} />
            ) : (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
