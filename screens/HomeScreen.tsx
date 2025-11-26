import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "./home/Movies";
import TV from "./home/TV";
import Search from "./home/Search";
import React from "react";
import IornIcons from "@expo/vector-icons/Ionicons";

const HomeScreen = createBottomTabNavigator({
  initialRouteName: "Movies",
  screens: {
    Movies: {
      screen: Movies, options: {
        title: "Movies", tabBarIcon: ({ focused, color, size }) => {
          return <IornIcons name={focused ? "film" : "film-outline"} color={color} size={size} />
        }
      }
    },
    TV: {
      screen: TV, options: {
        title: "TV", tabBarIcon: ({ focused, color, size }) => {
          return <IornIcons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
        }
      }
    },
    Search: {
      screen: Search, options: {
        title: "Search", tabBarIcon: ({ focused, color, size }) => {
          return <IornIcons name={focused ? "search" : "search-outline"} color={color} size={size} />
        }
      }
    },
  },
});

export default HomeScreen;