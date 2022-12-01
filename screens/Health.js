import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class HealthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          health: []
        };
      }
    fetchReminderHealth = () => {
        firebase.database().ref('/health/').on('value', (snapshot) => {
          let health = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              health.push({key:key,value:snapshot.val()[key]})
            })
          }
        this.setState({health:health})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersHealth();
      }
      renderItem = ({ item: story }) => {
        return <HealthScreen health={health} navigation={this.props.navigation} />;
      };
      async addStory() {
        if (this.state.idea && this.state.importance && this.state.motivation && this.state.time) {
          let storyData = {
            preview_image: this.state.previewImage,
            externalLinks: this.state.externalLinks,
            idea: this.state.idea,
            importance: this.state.importance,
            motivation: this.state.motivation,
            time: this.state.time,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/health/' + (Math.random().toString(36).slice(2))).set(healthData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Health')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addHealth = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_health", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_health = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_health", payload: id });
        };
      };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
        <Text>Health Screen!</Text>
                <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.stories}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 0.08 }} />
            </View>
        )
    }
}