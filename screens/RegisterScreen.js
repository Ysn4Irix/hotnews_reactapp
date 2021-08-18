/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 18-08-2021
 * @desc [description]
 */

import React, { useState, useContext } from "react";
import {
  StyledRegisterContainer,
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledRegisterButton,
  ButtonText,
  Colors,
  StyledTextInput,
  StyledInputLabel,
  MsgBox,
  ExtraText,
  ExtraView,
  LinkText,
  LinkTextContent,
  StyledDropDownContainer,
} from "../components/styles";
/* import KeybroardAvoidingWrapper from "../components/keyboardAvoidingWrapper"; */
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Octicons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./../components/CredentialsContext";

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("ar");
  const [selectedInterested, setSelectedInterested] = useState("general");
  const [message, setMessage] = useState();
  const [messageType, setmessageType] = useState();

  //CredentialsContext
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleRegister = (credentials, setSubmitting) => {
    handleMessage(null);
    const APIurl = "https://flutternewsapi.herokuapp.com/api/v1/register";

    axios
      .post(APIurl, credentials)
      .then((res) => {
        const result = res.data;
        const { response, message, user } = result;
        if (response !== "OK") {
          handleMessage(message, response);
          setSubmitting(false);
        } else {
          persistLogin(user, message, response);
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
        console.log(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisting Login Failed");
      });
  };

  return (
    /* <KeybroardAvoidingWrapper> */
    <StyledRegisterContainer>
      <StatusBar style="auto" />
      <InnerContainer>
        <PageTitle>HotNews</PageTitle>
        <Subtitle>Register</Subtitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            country: "ar",
            interestedin: "general",
          }}
          onSubmit={(values, { setSubmitting }) => {
            /* console.log(values); */
            handleRegister(values, setSubmitting);
          }}
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
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
              <MyPicker
                label="Country"
                icon="globe"
                mode="dropdown"
                prompt={"Select Country"}
                selectedValue={selectedCountry}
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue("country", itemValue);
                  setSelectedCountry(itemValue);
                }}
              >
                <Picker.Item label="Argentina" value="ar" />
                <Picker.Item label="Austria" value="at" />
                <Picker.Item label="Australia" value="au" />
                <Picker.Item label="Belgium" value="be" />
                <Picker.Item label="Brazil" value="br" />
                <Picker.Item label="China" value="cn" />
                <Picker.Item label="Canada" value="ca" />
                <Picker.Item label="Japan" value="jp" />
                <Picker.Item label="Korea" value="kp" />
                <Picker.Item label="France" value="fr" />
                <Picker.Item label="Morocco" value="ma" />
                <Picker.Item label="Russia" value="ru" />
                <Picker.Item label="United Arab Emirates" value="ae" />
                <Picker.Item label="United States" value="us" />
              </MyPicker>

              <MyPicker
                label="Interested in"
                icon="issue-opened"
                mode="dropdown"
                prompt={"Select Your Interested"}
                selectedValue={selectedInterested}
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue("interestedin", itemValue);
                  setSelectedInterested(itemValue);
                }}
              >
                <Picker.Item label="General" value="general" />
                <Picker.Item label="Business" value="business" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Science" value="science" />
                <Picker.Item label="Sports" value="sports" />
                <Picker.Item label="Technology" value="technology" />
              </MyPicker>
              <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting && (
                <StyledRegisterButton onPress={handleSubmit}>
                  <ButtonText>Register</ButtonText>
                </StyledRegisterButton>
              )}
              {isSubmitting && (
                <StyledRegisterButton disabled={true}>
                  <ActivityIndicator size="large" color={Colors.white} />
                </StyledRegisterButton>
              )}
              <ExtraView>
                <ExtraText>Already have an account ?</ExtraText>
                <LinkText onPress={() => navigation.navigate("LoginScreen")}>
                  <LinkTextContent>Login</LinkTextContent>
                </LinkText>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledRegisterContainer>
    /* </KeybroardAvoidingWrapper> */
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  isPassword2,
  hidePassword,
  setHidePassword,
  hidePassword2,
  setHidePassword2,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={25} color={Colors.darkLight} />
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
      {isPassword2 && (
        <RightIcon onPress={() => setHidePassword(!hidePassword2)}>
          <Ionicons
            size={26}
            color={Colors.darkLight}
            name={hidePassword2 ? "md-eye-off" : "md-eye"}
          />
        </RightIcon>
      )}
    </View>
  );
};

const MyPicker = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={25} color={Colors.darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledDropDownContainer>
        <Picker
          style={{
            height: 25,
            color: Colors.darkLight,
            width: 315,
          }}
          {...props}
        />
      </StyledDropDownContainer>
    </View>
  );
};

export default Register;
