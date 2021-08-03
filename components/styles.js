/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 03-08-2021
 * @desc [description]
 */

import styled from "styled-components";
import Constants from "expo-constants";
import { Text, Image, View, TextInput, TouchableOpacity } from "react-native";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#282a36",
  secondary: "#44475a",
  purple: "#6272a4",
  green: "#50fa7b",
  white: "#F5F5F5",
  brand: "#6D2809",
  darkLight: "#9CA3bF",
  red: "#D32F2F",
};

const { primary, secondary, purple, green, white, brand, darkLight, red } =
  Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 90}px;
  background-color: ${darkLight};
`;

export const StyledRegisterContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 60}px;
  background-color: ${darkLight};
`;

export const StyledNewsContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 50}px;
  background-color: ${darkLight};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 80px;
  height: 70px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  padding-bottom: 5px;
  color: ${secondary};
`;

export const NewsPageTitle = styled.Text`
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  padding-bottom: 20px;
  color: ${secondary};
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  color: ${purple};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 15px;
  font-size: 16px;
  margin-vertical: 3px;
  margin-bottom: 5px;
  color: ${darkLight};
`;

export const StyledDropDownContainer = styled.View`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 15px;
  font-size: 16px;
  margin-vertical: 3px;
  margin-bottom: 5px;
  color: ${darkLight};
`;

export const StyledInputLabel = styled.Text`
  color: ${purple};
  font-size: 18px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 40px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 40px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${purple};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-vertical: 18px;
  height: 60px;
`;

export const StyledRegisterButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${purple};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-vertical: 12px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  color: ${white};
  font-size: 19px;
  letter-spacing: 2px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 15px;
  padding-top: 8px;
  font-weight: bold;
  color: ${(props) => (props.type == "OK" ? Colors.green : Colors.red)};
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: ${purple};
  padding: 5px;
`;

export const LinkText = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const LinkTextContent = styled.Text`
  color: ${secondary};
  letter-spacing: 1px;
  font-size: 15px;
`;

export const NewsCard = styled.View`
  background-color: ${Colors.white};
  border-radius: 10px;
  width: 370px;
  margin-vertical: 8px;
  overflow: hidden;
`;

export const CardImage = styled.Image`
  height: 135px;
  width: auto;
`;

export const IntrestedInTitle = styled.Text`
  font-size: 25px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  color: ${purple};
  text-transform: capitalize;
`;
