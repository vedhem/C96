import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar, ImageBackground, Image } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <Text>
                    Reminder App
                </Text>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Event")}>
                    <Text>
                        Event
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Finance")}>
                    <Text>
                        Finance
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Health")}>
                    <Text>
                        Health
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Other")}>
                    <Text>
                        Other
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Social")}>
                    <Text>
                        Social
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Work")}>
                    <Text>
                        Work
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}