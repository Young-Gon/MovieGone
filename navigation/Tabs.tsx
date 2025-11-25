import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import React from "react";
import IornIcons from "@expo/vector-icons/Ionicons";

export default function Tabs() {
  const Tab = createBottomTabNavigator({
    initialRouteName: "Movies",
    screens: {
      Movies: { screen: Movies, options: { title: "Movies", tabBarIcon:({ focused, color, size })=>{
        return <IornIcons name={focused?"film":"film-outline"} color={color} size={size} />
      } } },
      TV: { screen: TV, options: { title: "TV", tabBarIcon:({ focused, color, size })=>{
        return <IornIcons name={focused?"tv":"tv-outline"} color={color} size={size}/>
      } } } ,
      Search: { screen: Search, options: { title: "Search", tabBarIcon:({ focused, color, size })=>{
        return <IornIcons name={focused?"search":"search-outline"} color={color} size={size}/>
      } } },
    },
  });

  const Navigation = createStaticNavigation(Tab);
  return <Navigation />;
}