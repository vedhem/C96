import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import EventScreen from "../screens/Event";
import FinanceScreen from "../screens/Finance";
import HealthScreen from "../screens/Health";
import HomeScreen from "../screens/HomeScreen";
import OtherScreen from "../screens/Other";
import SocialScreen from "../screens/Social";
import WorkScreen from "../screens/Work";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
            name="Home"
            component = {TabNavigator}
            />
            <Drawer.Screen
            name="Event"
            component={EventScreen}
            />
            <Drawer.Screen
            name="Finance"
            component={FinanceScreen}
            />
            <Drawer.Screen
            name="Health"
            component={HealthScreen}
            />
            <Drawer.Screen
            name="Other"
            component={OtherScreen}
            />
            <Drawer.Screen
            name="Social"
            component={SocialScreen}
            />
            <Drawer.Screen
            name="Work"
            component={WorkScreen}
            />
        </Drawer.Navigator>
    )
}
export default DrawerNavigator