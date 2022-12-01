import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class SocialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          social: []
        };
      }
    fetchRemindersSocial = () => {
        firebase.database().ref('/social/').on('value', (snapshot) => {
          let social = []
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function(keys) {
              social.push({key:key,value:snapshot.val()[key]})
            })
          }
        this.setState({social:social})
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed :(' + errorObject.code)
        }
        )
      }
      componentDidMount () {
        this.fetchRemindersSocial();
      }
      renderItem = ({ item: story }) => {
        return <SocialScreen social={social} navigation={this.props.navigation} />;
      };
      async addStory() {
      if (this.state.name && this.state.importance && this.state.people && this.state.time && this.state.place) {
          let storyData = {
            preview_image: this.state.previewImage,
            name: this.state.name,
            importance: this.state.importance,
            people: this.state.people,
            time: this.state.time,
            place:this.state.place
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase.database().ref('/social/' + (Math.random().toString(36).slice(2))).set(socialData)
          .then(function(Snapshot){})
          this.props.navigation.navigate('Social')
        }
        else {
          Alert.alert('Error', 'all fields are required', [{text:'okay',onPress:()=>console.log('okay pressed')}], {cancelable:false})
        }
      }
      const addSocial = (dispatch) => {
        return () => {
          let tep = new Date(Date.now());
          let time = new Date(Date.now());
          tep.setHours(0, 0, 0, 0);
          time.setHours(0, 0, 0, 0);
          time.setFullYear(tep.getFullYear() + 1);
          let id = notif(" ", time.getTime() / 1000 - tep.getTime() / 1000);
          id.then((value) => {
            time.setFullYear(tep.getFullYear());
            dispatch({ type: "add_social", payload: { time, value } });
          }).catch((e) => {
            console.error(e);
          });
        };
      };
      const delete_social = (dispatch) => {
        return (id) => {
          Cancle_Notif(id.notificationId);
          dispatch({ type: "delete_social", payload: id });
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
        <Text>Social Screen!</Text>
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