/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 24-05-2021
 * @modify date 05-08-2021
 * @desc [description]
 */

import React, { useState, useEffect, useContext, Component } from "react";
import {
  StyledNewsContainer,
  InnerContainer,
  NewsPageTitle,
  NewsCard,
  CardImage,
  Colors,
  IntrestedInTitle,
  LinkText,
  LinkTextContent,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./../components/CredentialsContext";

const News = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const APIurl = "https://flutternewsapi.herokuapp.com/api/v1/news";

  //CredentialsContext
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  //console.log(storedCredentials);
  const { _id, token, country, interestedin } = storedCredentials;

  //#region Switch
  let flag = "🇦🇷";

  switch (country) {
    case "ar":
      flag;
      break;
    case "at":
      flag = "🇦🇹";
      break;
    case "au":
      flag = "🇦🇺";
      break;
    case "be":
      flag = "🇧🇪";
      break;
    case "cn":
      flag = "🇨🇳";
      break;
    case "br":
      flag = "🇧🇷";
      break;
    case "ca":
      flag = "🇨🇦";
      break;
    case "jp":
      flag = "🇯🇵";
      break;
    case "kr":
      flag = "🇰🇵";
      break;
    case "fr":
      flag = "🇫🇷";
      break;
    case "ma":
      flag = "🇲🇦";
      break;
    case "ru":
      flag = "🇷🇺";
      break;
    case "ua":
      flag = "🇦🇪";
      break;
    case "us":
      flag = "🇺🇸";
      break;
  }
  /* return console.log(token); */
  //#endregion

  useEffect(() => {
    axios
      .get(APIurl, {
        headers: { "Content-Type": "application/json", ysntoken: token },
      })
      .then((res) => {
        const { news } = res.data;
        if (news !== null) {
          setData(news);
          setLoading(false);
        } else {
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error.JSON);
      });
  });

  const ClearLogin = () => {
    AsyncStorage.removeItem("UserData")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledNewsContainer>
      <StatusBar style="auto" />
      <ScrollView>
        <InnerContainer>
          <NewsPageTitle>
            Latest news in {flag} for{" "}
            <IntrestedInTitle>{interestedin}</IntrestedInTitle>
          </NewsPageTitle>
          <LinkText onPress={ClearLogin}>
            <LinkTextContent>Logout</LinkTextContent>
          </LinkText>
          {isLoading ? (
            <ActivityIndicator
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue",
              }}
              size="large"
              color={Colors.white}
            />
          ) : (
            data.map((item) => {
              return (
                <NewsCard key={item.title}>
                  <View>
                    <CardImage
                      source={{
                        uri:
                          item.urlToImage !== null
                            ? item.urlToImage
                            : "https://via.placeholder.com/400x200",
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                    <View style={{ padding: 10 }}>
                      <Text>{item.title}</Text>
                      <Text style={{ color: "#777", paddingTop: 5 }}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </NewsCard>
              );
            })
          )}
        </InnerContainer>
      </ScrollView>
    </StyledNewsContainer>
  );
};

export default News;
