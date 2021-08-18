/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 18-08-2021
 * @desc [description]
 */

import React, { useState, useContext } from "react";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  PageLogo,
  Subtitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  StyledTextInput,
  StyledInputLabel,
  MsgBox,
  ExtraText,
  ExtraView,
  LinkText,
  LinkTextContent,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { ActivityIndicator, View } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./../components/CredentialsContext";

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setmessageType] = useState();

  //CredentialsContext
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const APIurl = "https://flutternewsapi.herokuapp.com/api/v1/login";

    axios
      .post(APIurl, credentials)
      .then((res) => {
        const result = res.data;
        const { response, message } = result;
        if (response !== "LoggedIn") {
          handleMessage(message, response);
          setSubmitting(false);
        } else {
          /* return console.log({ ...message.user }); */
          /* navigation.navigate("NewsScreen", { ...message.user }); */
          persistLogin({ ...message.user }, response, "LoggedIn");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON);
        setSubmitting(false);
        handleMessage("An error occured. Check your network");
      });
  };

  const handleMessage = (message, type = "An error occured") => {
    setMessage(message);
    setmessageType(type);
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("UserData", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisting Login Failed");
      });
  };

  return (
    /*     <KeybroardAvoidingWrapper> */
    <StyledContainer>
      <StatusBar style="auto" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require("./../assets/news.png")} />
        <PageTitle>HotNews</PageTitle>
        <Subtitle>Login</Subtitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            /* console.log(values); */
            handleLogin(values, setSubmitting);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
          }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email address"
                icon="mail"
                placeholder="mail@example.com"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * * * *"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting && (
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
              )}
              {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={Colors.white} />
                </StyledButton>
              )}
              <ExtraView>
                <ExtraText>Don't have an account</ExtraText>
                <LinkText onPress={() => navigation.navigate("RegisterScreen")}>
                  <LinkTextContent>Register</LinkTextContent>
                </LinkText>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    /* </KeybroardAvoidingWrapper> */
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={26} color={Colors.darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            size={26}
            color={Colors.darkLight}
            name={hidePassword ? "md-eye-off" : "md-eye"}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
