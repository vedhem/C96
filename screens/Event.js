import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class EventScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          events: []
        };
      }
    fetchRemindersEvents = () => {
        firebase.database().ref('/events/').on('value', (snapshot) => {
          let events = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              events.push({key:key,value:snapshot.val()[key]})
            })
          }
          this.setState({events:events})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersEvents();
      }
      renderItem = ({ item: story }) => {
        return <EventScreen events={events} navigation={this.props.navigation} />;
      };
      async addStory() {
        if (this.state.date && this.state.importance && this.state.people && this.state.name && this.state.where) {
          let storyData = {
            preview_image: this.state.previewImage,
            date: this.state.date,
            importance: this.state.importance,
            people: this.state.people,
            name: this.state.name,
            where: this.state.where,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/events/' + (Math.random().toString(36).slice(2))).set(eventData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Event')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addEvent = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_birthday", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_birthday = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_birthday", payload: id });
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
                <Text>Event screen!</Text>
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