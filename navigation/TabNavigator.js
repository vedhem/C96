import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import EventScreen from "../screens/Event";
import FinanceScreen from "../screens/Finance";
import HealthScreen from "../screens/Health";
import HomeScreen from "../screens/HomeScreen";
import OtherScreen from "../screens/Other";
import SocialScreen from "../screens/Social";
import WorkScreen from "../screens/Work";
const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({
            route
        })=>({
            tabBarIcon: ({focused, color, size}) =>{
                let iconName
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                  }
                  else if (route.name === "Event") {
                    iconName = focused ? "clock" : "clock-outline";
                  }
                  else if (route.name === "Finance") {
                    iconName = focused ? "cash" : "cash-outline";
                  }
                  else if (route.name === "Health") {
                    iconName = focused ? "heart" : "heart-outline";
                  }
                  else if (route.name === "Work") {
                    iconName = focused ? "briefcase" : "briefcase-outline";
                  }
                  else if (route.name === "Social") {
                    iconName = focused ? "people" : "people-outline"
                  }
                  else if (route.name === "Other") {
                    iconName = focused ? "list" : "list-outline"
                  }
                  return (
                    
                    <IonIcons name={iconName} size={RFValue(25)} color={color} style={styles.icons}/>
                  )
            }
        })}
        activeColor = {'red'}
        inactiveColor = {'gray'}
        >
            <Tab.Screen name='Event' component={EventScreen}/>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Finance' component={FinanceScreen}/>
            <Tab.Screen name='Health' component={HealthScreen}/>
            <Tab.Screen name='Work' component={WorkScreen}/>
            <Tab.Screen name='Social' component={SocialScreen}/>
            <Tab.Screen name='Other' component={OtherScreen}/>
        </Tab.Navigator>
    )
}
styles = StyleSheet.create ({
    bottomTabStyle: {
        backgroundColor: "#2f345d",
        height: "8%",
        borderTopLeftRadius: RFValue(30),
        borderTopRightRadius: RFValue(30),
        overflow: "hidden",
        position: "absolute"
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30)
    }
})

export default BottomTabNavigator();